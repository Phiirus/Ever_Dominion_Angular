import { Component, Input } from '@angular/core';
import { Chat } from '../model/Chat';

@Component({
  selector: 'app-chatbox-card',
  standalone: true,
  imports: [],
  templateUrl: './chatbox-card.component.html',
  styleUrl: './chatbox-card.component.css'
})
export class ChatboxCardComponent 
{
  @Input() chat!:Chat;

  alignMessages(chatId:number) : string
  {
    if(chatId==parseInt(localStorage.getItem("id")!)) 
    {
      return "messaggio-user"
    }
    else
    {
      return "messaggio"
    }
  }
}
