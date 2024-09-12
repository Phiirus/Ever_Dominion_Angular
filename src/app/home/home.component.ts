import {Component} from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { LeaderboardMenuComponent } from '../leaderboard-menu/leaderboard-menu.component';
import { PveMenuComponent } from "../pve-menu/pve-menu.component";


/**
 * @title Dynamic grid-list
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatGridListModule, LeaderboardMenuComponent, PveMenuComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent
{
  
}
