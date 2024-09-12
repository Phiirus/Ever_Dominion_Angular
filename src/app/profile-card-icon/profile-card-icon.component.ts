import { Component, EventEmitter, Output } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-profile-card-icon',
  standalone: true,
  imports: [MatGridListModule],
  templateUrl: './profile-card-icon.component.html',
  styleUrl: './profile-card-icon.component.css'
})
export class ProfileCardIconComponent 
{
  icons: string[] = [];
  @Output() swapIconEmitter: EventEmitter<string> = new EventEmitter<string>();

  constructor()
  {
    this.icons.push("https://i.imgur.com/ezI6Q1G.png")
    this.icons.push("https://i.imgur.com/9SosBgT.png")
    this.icons.push("https://i.imgur.com/8XwnPsO.png")
    this.icons.push("https://i.imgur.com/Zt90JBD.png")
    this.icons.push("https://i.imgur.com/jhU6ZL7.png")
    this.icons.push("https://i.imgur.com/a3cD05e.png")
  }

  callFatherEvent(newIcon: string)
  {
    this.swapIconEmitter.emit(newIcon)
  }
}
