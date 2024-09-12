import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Player } from '../model/Player';
import { PlayerService } from '../services/player.service';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-friend-card',
  standalone: true,
  imports: [MatGridListModule],
  templateUrl: './friend-card.component.html',
  styleUrl: './friend-card.component.css'
})
export class FriendCardComponent 
{
  @Input() friend!: Player;
  backendError: string = "";

  constructor(private playerServ: PlayerService){}

  isOnline(): boolean
  {
    return this.friend.online == "ONLINE";
  }

  removeFriend()
  {
    this.playerServ.removeFriend(this.friend.id, parseInt(localStorage.getItem("id")!)).subscribe(
      {
        next: data =>
        {
          console.log("Rimosso id: "+this.friend.id)
        },
        error: err =>
        {
          this.backendError = err.error;
          alert(this.backendError)
        }
      }
    )
  }
}
