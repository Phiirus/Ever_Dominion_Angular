import { Component, Input } from '@angular/core';
import { MatGridListModule, MatGridTile } from '@angular/material/grid-list';
import { TroopCardComponent } from '../troop-card/troop-card.component';
import { User } from '../model/User';
import { Player } from '../model/Player';
import { LocalStorageService } from '../services/local-storage.service';
import { PlayerService } from '../services/player.service';
import { ProfileCardStatComponent } from "../profile-card-stat/profile-card-stat.component";
import { ProfileCardIconComponent } from "../profile-card-icon/profile-card-icon.component";

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [MatGridTile, TroopCardComponent, MatGridListModule, ProfileCardStatComponent, ProfileCardIconComponent],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.css'
})
export class ProfileCardComponent 
{
  user!: User;
  changeIcon: boolean = false;
  @Input() player!: Player;


  constructor(private webStorage: LocalStorageService, private playerServ:PlayerService)
  {
    this.user = this.webStorage.getItem("user");
  }

  swapIcon(newIcon: string): void
  {
    this.player.icon = newIcon;
    this.playerServ.switchIcon(this.player.id, newIcon).subscribe();
    this.changeIconView()
  }

  changeIconView()
  {
    this.changeIcon = !this.changeIcon;
  }
}
