import { Component, inject, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Fight } from '../model/Fight';

@Component({
  selector: 'app-fight-result',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './fight-result.component.html',
  styleUrl: './fight-result.component.css'
})
export class FightResultComponent 
{
  @Input() fightRes!:Fight;
  router: Router = inject(Router)
  
  homeButton()
  {
    this.router.navigate(["home"])
  }

}
