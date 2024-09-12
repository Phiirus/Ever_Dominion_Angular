import { Component, Injector, Input } from '@angular/core';
import { Player } from '../model/Player';
import { AuthService } from '../services/auth.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Notify } from '../model/Notify';
import {MatBadgeModule} from '@angular/material/badge';
import { StompService } from '../services/stomp.service';
import { BellComponent } from "../bell/bell.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, MatBadgeModule, BellComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent 
{
  @Input() player!: Player;

  stomp!: StompService;
  shieldVisibility: boolean = false;
  timeRemaining: { hours: number, minutes: number, seconds: number } | null = null;
  private intervalId: any;

  constructor(public authService: AuthService,private injector: Injector){}
  

  ngOnInit(): void 
  {
    this.startTimer();
  }

  startTimer()
  {
    this.updateTimeRemaining();

    this.intervalId = setInterval(() => 
    {
      this.updateTimeRemaining();
    }, 1000);
  }

  logout(): void
  {
    this.authService.logout();
  }
  
  ngOnDestroy(): void 
  {
    if (this.intervalId) 
      clearInterval(this.intervalId);
  }


  updateTimeRemaining(): void 
  {
    let shieldTime: Date | null = this.player ? new Date(this.player.shield.split(".")[0] as string) : null;

    if(!shieldTime)
    {
      this.shieldVisibility = false;
      this.timeRemaining = { hours: 0, minutes: 0, seconds: 0 };
      return;
    }

    let currentDate = new Date();
    let timeDiff = shieldTime.getTime() - currentDate.getTime();

    if(timeDiff > 0) 
    {
      this.shieldVisibility = true;
      let hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
      let minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
      let seconds = Math.floor((timeDiff / 1000) % 60);

      this.timeRemaining = { hours, minutes, seconds };
    } 
    else 
    {
      this.shieldVisibility = false;
      this.timeRemaining = { hours: 0, minutes: 0, seconds: 0 };
      clearInterval(this.intervalId);
    }
  }
}
