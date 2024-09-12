import { Component, Input } from '@angular/core';
import { PvePlayer } from '../model/PvePlayer';
import { MatGridListModule } from '@angular/material/grid-list';
import { TroopCardComponent } from "../troop-card/troop-card.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pve-player-card',
  standalone: true,
  imports: [MatGridListModule, TroopCardComponent, CommonModule],
  templateUrl: './pve-player-card.component.html',
  styleUrl: './pve-player-card.component.css'
})
export class PvePlayerCardComponent 
{
  @Input() pvePlayer !: PvePlayer;

  filtro : string = "filter: grayscale(70%) contrast(150%) brightness(80%) sepia(30%) hue-rotate(-10deg);"
  constructor(){}
}
