import { Component, Input } from '@angular/core';
import { Troop } from '../model/Troop';
import { MatGridListModule } from '@angular/material/grid-list';
import { TroopInShop } from '../model/TroopInShop';

@Component({
  selector: 'app-troop-card-idle',
  standalone: true,
  imports: [MatGridListModule],
  templateUrl: './troop-card-idle.component.html',
  styleUrl: './troop-card-idle.component.css'
})
export class TroopCardIdleComponent 
{
  @Input() troop!:Troop;
  @Input() troopInShop!:TroopInShop;
  

  setSprite(): string
  {
    return this.troop.className.toLowerCase().includes("knight") ? "https://i.imgur.com/fA62hrl.gif" : "https://i.imgur.com/RP0AmLf.gif";
  }

  setBackground(): string
  {
    return this.troop.className.toLowerCase().includes("knight") ?  'url("https://i.imgur.com/JKzHY0e.png")' : 'url("https://i.imgur.com/QxuxL0Y.png")';
  }

  setSpriteShop(): string
  {
    return this.troopInShop.className.toLowerCase().includes("knight") ? "https://i.imgur.com/fA62hrl.gif" : "https://i.imgur.com/RP0AmLf.gif";
  }

  setBackgroundShop(): string
  {
    return this.troopInShop.className.toLowerCase().includes("knight") ?  'url("https://i.imgur.com/JKzHY0e.png")' : 'url("https://i.imgur.com/QxuxL0Y.png")';
  }
}
