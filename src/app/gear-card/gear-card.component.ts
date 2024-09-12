import { Component, HostListener, Input } from '@angular/core';
import { Gear } from '../model/Gear';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgStyle } from '@angular/common';
import { Player } from '../model/Player';

@Component({
  selector: 'app-gear-card',
  standalone: true,
  imports: [MatGridListModule, NgStyle],
  templateUrl: './gear-card.component.html',
  styleUrl: './gear-card.component.css'
})
export class GearCardComponent 
{
  @Input() player!: Player;
  @Input() gear!: Gear;

  mouseX: number = 0;
  mouseY: number = 0;

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void 
  {
    this.mouseX = event.clientX+5;
    this.mouseY = event.clientY+5;
  }

  playerHasGear(gearInShop: Gear): boolean | number | null
  {
    if(this.player.activeGears)
      for(let gear of this.player.activeGears)
      {
        if(gear.id == gearInShop.id && gear.tier == 3)
          return null;

        if(gear.id == gearInShop.id)
          return gear.price*(gear.tier+1);
      }

    if(this.player.storageGears)
      for(let gear of this.player.storageGears)
      {
        if(gear.id == gearInShop.id && gear.tier == 3)
          return null;

        if(gear.id == gearInShop.id)
          return gear.price*(gear.tier+1);
      }

    return false;
  }
}