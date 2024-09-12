import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Player } from '../model/Player';
import { Chat } from '../model/Chat';
import { PlayerService } from '../services/player.service';
import SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { MatGridListModule } from '@angular/material/grid-list';
import { isValidMessage } from '../services/validators/isValidMessage';
import { ChatboxCardComponent } from "../chatbox-card/chatbox-card.component";

@Component({
  selector: 'app-chatbox',
  standalone: true,
  imports: [ReactiveFormsModule, MatGridListModule, ChatboxCardComponent],
  templateUrl: './chatbox.component.html',
  styleUrl: './chatbox.component.css'
})
export class ChatboxComponent {

  @Input() player!: Player;
  popup : string = "";
  chats : Chat[]=[];

  constructor(private playerServ: PlayerService)
  {
    this.initializeWebSocketConnection();

    this.subscribe(`/topic/chat`, message => 
    {
      this.chats = JSON.parse(message) as Chat[];
    });
  }

  chatForm = new FormGroup(
    {
      message: new FormControl("", [Validators.required]),
    }
  )

  sendMessage(): void
  {
    if (this.chatForm.valid) 
    {
      let mess: string = this.chatForm.get('message')?.value!;
      let chat: Chat = {player: this.player, message: mess, date: ""}

      this.playerServ.sendMessage(chat);

      this.chatForm.reset();
    }
  }

  toggle()
  {
    if(this.popup=="")
      {
        this.popup="visibility";
      }
    else
      this.popup="";
  }

  visibility(): String
  {

    return this.popup;
  }

  /////STOMPO

  private socket: any;
  private stompClient: any;


  initializeWebSocketConnection(): void {
    this.socket = new SockJS('http://localhost:8080/websocket'); //mappatura in spring
    this.stompClient = Stomp.over(this.socket);

    this.stompClient.debug = null;

    const _this = this;
    this.stompClient.connect({}, function (frame: any) {
      // console.log('Connected: ' + frame);
    }, function(error: any) {
      console.error('Error: ' + error);
    });
  }

  subscribe(topic: string, callback: (message: any) => void): void {
    const _this = this;
    if (this.stompClient.connected) {
      this.subscribeToTopic(topic, callback);
    } else {
      this.stompClient.connect({}, function () {
        _this.subscribeToTopic(topic, callback);
      });
    }
  }

  private subscribeToTopic(topic: string, callback: (message: any) => void): void {
    this.stompClient.subscribe(topic, (message: any) => {
      // console.log('Received message: ' + message.body);
      callback(message.body);
    });
  }

  send(destinazione: string, playload: string)
  {
    this.stompClient.publish({destinazione: "/ws/"+destinazione, body: playload})
  }

}
