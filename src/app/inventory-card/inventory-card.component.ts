import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { Troop } from '../model/Troop';
import { TroopCardIdleComponent } from '../troop-card-idle/troop-card-idle.component';
import { Gear } from '../model/Gear';
import { GearCardComponent } from "../gear-card/gear-card.component";
import {MatIconModule} from '@angular/material/icon';
import { Route, Router, RouterLink } from '@angular/router';
import { PlayerService } from '../services/player.service';
import { Player } from '../model/Player';

@Component({
  selector: 'app-inventory-card',
  standalone: true,
  imports: [MatGridListModule, TroopCardIdleComponent, GearCardComponent, MatIconModule, RouterLink],
  templateUrl: './inventory-card.component.html',
  styleUrl: './inventory-card.component.css'
})
export class InventoryCardComponent 
{
  @Input() storageTroops!: Troop[];
  @Input() storageGears!: Gear[];
  @Input() activeGears!: Gear[];
  @Input() inventory!: boolean;

  @Output() switchTroopEvent: EventEmitter<Troop> = new EventEmitter<Troop>();
  @Output() switchGearEvent: EventEmitter<Gear> = new EventEmitter<Gear>();
  @Output() customOverMouse: EventEmitter<Gear> = new EventEmitter<Gear>();
  @Output() customUnoverMouse: EventEmitter<void> = new EventEmitter();
  @Output() customSellTroop: EventEmitter<number> = new EventEmitter();

  constructor(private router:Router)
  {

  }

  callTroopEvent(troop: Troop)
  {
    this.switchTroopEvent.emit(troop);
  }

  callGearEvent(gear: Gear)
  {
    this.switchGearEvent.emit(gear);
  }

  callOverGear(gear: Gear)
  {
    this.customOverMouse.emit(gear);
  }

  callUnoverGear()
  {
    this.customOverMouse.emit();
  }
  
  sellTroop(troopId: number)
  {
    this.customSellTroop.emit(troopId);
  }

  troopPrice(troop: Troop)
  {
    return Math.floor(troop.price/3)
  }


  goToShop():void{
    this.router.navigate(['shop']);
  }
}
