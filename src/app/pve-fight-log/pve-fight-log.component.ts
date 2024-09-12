import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Player } from '../model/Player';

@Component({
  selector: 'app-pve-fight-log',
  standalone: true,
  imports: [],
  templateUrl: './pve-fight-log.component.html',
  styleUrl: './pve-fight-log.component.css'
})
export class PveFightLogComponent 
{
  @Input() results !: string[];
  @Input() player!: Player;
  @Output() fightStart : EventEmitter<void> = new EventEmitter;
  buttonVisibility: string = "visible";
  constructor(){}

  fightButtonClicked(): void
  {
    let now: Date = new Date();
    now.setSeconds(now.getSeconds() - 10);

    if(new Date(localStorage.getItem("time")!) > now)
    {
      alert("Aspetta il tempo di attesa prima di riattaccare");
      return;
    }

    localStorage.setItem("time", new Date().toISOString())

    this.fightStart.emit();
    this.buttonVisibility="hidden";
  }

  messageAlign(message: string) : string
  {
    return message.includes(this.player.nick + " ha") ? "flex-start" : "flex-end";
  }

  cssClass(message: string)
  {
    return message.includes(this.player.nick + " ha") ? "attackerStyle" : "defenderStyle";
  }
}
