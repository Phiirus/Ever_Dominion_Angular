import { Component, Input } from '@angular/core';
import { MatGridListModule, MatGridTile } from '@angular/material/grid-list';
import { TroopCardComponent } from '../troop-card/troop-card.component';
import { User } from '../model/User';
import { Player } from '../model/Player';
import { PlayerService } from '../services/player.service';
import { ProfileCardStatComponent } from "../profile-card-stat/profile-card-stat.component";
import { ProfileCardIconComponent } from "../profile-card-icon/profile-card-icon.component";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [MatGridTile, TroopCardComponent, MatGridListModule, ProfileCardStatComponent, ProfileCardIconComponent],
  templateUrl: './profile-card-other.component.html',
  styleUrl: './profile-card-other.component.css'
})
export class ProfileCardOtherComponent 
{
  targetPlayer!: Player;
  player!: Player;

  constructor(private playerServ:PlayerService, private route:ActivatedRoute)
  {
    console.log(this.route.snapshot.paramMap.get('id')!)
    this.playerServ.getOne(parseInt(this.route.snapshot.paramMap.get('id')!)).subscribe(data => this.targetPlayer = data);
    this.playerServ.getOne(parseInt(localStorage.getItem('id')!)).subscribe(data => this.player = data);
  }
}