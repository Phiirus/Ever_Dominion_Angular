import { Component, Input } from '@angular/core';
import { Troop } from '../model/Troop';
import { MatGridListModule } from '@angular/material/grid-list';
import { TroopInShop } from '../model/TroopInShop';

@Component({
  selector: 'app-troop-card',
  standalone: true,
  imports: [MatGridListModule],
  templateUrl: './troop-card.component.html',
  styleUrl: './troop-card.component.css'
})
export class TroopCardComponent 
{
  @Input() troop!:Troop;
  

  setSprite(): string
  {
    switch(this.troop.className.toLowerCase())
    {
      case "knight":
        return "https://i.imgur.com/MJ2k2r9.gif";

      case "archer":
        return "https://i.imgur.com/DAnhjge.gif";

      case "tnt":
        return "https://i.imgur.com/wMAinTa.gif";  //https://i.imgur.com/Km3oB3E.gif

      case "torch":
        return "https://i.imgur.com/1td1K0H.gif";

      default:
        return "https://i.imgur.com/MJ2k2r9.gif";
    }
  }

  setBackground(): string
  {
    switch(this.troop.className.toLowerCase())
    {
      case "knight":
        return 'url("https://i.imgur.com/JKzHY0e.png")';

      case "archer":
        return 'url("https://i.imgur.com/QxuxL0Y.png")';

      case "tnt":
        return 'url("https://i.imgur.com/VnNak17.png")';
        
        case "torch":
        return 'url("https://i.imgur.com/VnNak17.png")';

      default:
        return 'url("https://i.imgur.com/JKzHY0e.png")';
    }
  }

  // setFilter() : string
  // {
  //   switch(this.troop.className.toLowerCase())
  //   {
  //     case "knight":
  //       return '';

  //     case "archer":
  //       return '';

  //     case "tnt":
  //       return 'grayscale(70%) contrast(150%) brightness(80%) sepia(30%) hue-rotate(-10deg)';
        
  //       case "torch":
  //       return 'grayscale(70%) contrast(150%) brightness(80%) sepia(30%) hue-rotate(-10deg)';

  //     default:
  //       return '';
  //   }
  // }
}
