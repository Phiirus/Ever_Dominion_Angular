import { Component } from '@angular/core';
import { Player } from '../model/Player';
import { PlayerService } from '../services/player.service';
import { User } from '../model/User';
import { MatGridListModule } from '@angular/material/grid-list';
import { TroopCardComponent } from '../troop-card/troop-card.component';
import { Troop } from '../model/Troop';
import { LocalStorageService } from '../services/local-storage.service';
import { TroopCardIdleComponent } from '../troop-card-idle/troop-card-idle.component';
import { ProfileCardComponent } from '../profile-card/profile-card.component';
import { InventoryCardComponent } from '../inventory-card/inventory-card.component';
import { Gear } from '../model/Gear';
import { GearCardComponent } from "../gear-card/gear-card.component";

@Component({
  selector: 'app-player-detail',
  standalone: true,
  imports: [MatGridListModule, InventoryCardComponent, TroopCardComponent, TroopCardIdleComponent, ProfileCardComponent, GearCardComponent],
  templateUrl: './player-detail.component.html',
  styleUrl: './player-detail.component.css'
})
export class PlayerDetailComponent {

  user!: User;
  player!: Player;
  overedGear!: Gear | null;
  
  activeTroops: Troop[] = [];
  storageTroops: Troop[] = [];
  activeGears: Gear[] = [];
  storageGears: Gear[] = [];

  

  constructor(private webStorage: LocalStorageService, private playerServ:PlayerService)
  {
    this.user = this.webStorage.getItem("user");
    this.playerServ.getOne(parseInt(localStorage.getItem("id")!)).subscribe(
      data =>
      {
        this.player = data;

        this.activeTroops = this.player.activeTroops;
        this.storageTroops = this.player.storageTroops.reverse();

        this.activeGears = this.player.activeGears
        this.storageGears = this.player.storageGears.reverse();
      }
    );
  }

  switchTroopState(troop: Troop, active: boolean)
  {
    if(active)
    {
      this.activeTroops = this.activeTroops.filter(t => t.id !== troop.id);
      this.storageTroops.unshift(troop);
      this.playerServ.switchTroopState(troop.id).subscribe(data => this.player = data);
    }
    else
      if(this.activeTroops.length < 6)
      {
        this.storageTroops = this.storageTroops.filter(t => t.id !== troop.id);
        this.activeTroops.push(troop);
        this.playerServ.switchTroopState(troop.id).subscribe(data => this.player = data);
      }
  }

  switchGearState(gear: Gear, active: boolean)
  {
    this.mouseUnoverGear()

    if(active)
    {
      this.activeGears = this.activeGears.filter(t => t.id !== gear.id);
      this.storageGears.unshift(gear);
      this.playerServ.switchGearState(gear.id, this.player.id).subscribe(data => this.player = data);
    }
    else
      if(this.activeGears.length < 3)
      {
        this.storageGears = this.storageGears.filter(t => t.id !== gear.id);
        this.activeGears.push(gear);
        this.playerServ.switchGearState(gear.id, this.player.id).subscribe(data => this.player = data);
      }
  }

  mouseOveredGear(gear: Gear): Gear
  {
    return this.overedGear = gear;
  }

  mouseUnoverGear()
  {
    this.overedGear = null;
  }
}
