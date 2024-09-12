import { Component } from '@angular/core';
import { PlayerService } from '../services/player.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from '../model/Player';
import { PvePlayer } from '../model/PvePlayer';
import { PveService } from '../services/pve.service';
import { Fight } from '../model/Fight';
import { MatGridListModule } from '@angular/material/grid-list';
import { PlayerCardComponent } from '../player-card/player-card.component';
import { PveFightLogComponent } from "../pve-fight-log/pve-fight-log.component";
import { PvePlayerCardComponent } from "../pve-player-card/pve-player-card.component";
import { FightResultComponent } from "../fight-result/fight-result.component";

@Component({
  selector: 'app-pve-fight-page',
  standalone: true,
  imports: [MatGridListModule, PlayerCardComponent, PveFightLogComponent, PvePlayerCardComponent, FightResultComponent],
  templateUrl: './pve-fight-page.component.html',
  styleUrl: './pve-fight-page.component.css'
})
export class PveFightPageComponent 
{
  player!: Player;
  pvePlayer!: PvePlayer;
  fightRes !: Fight;
  results: string[] = [];
  buttonOn = true;
  backendErr!: string;

  playerHealthPos = 0;
  pveHealthPos = 0;
  playerDamageVisibility:string = "hidden";
  enemyDamageVisibility:string = "hidden";
  playerDamageReceived!:number;
  enemyDamageReceived!:number;

  endVisibility:boolean=false;
  


  constructor(private playerServ: PlayerService, private route: ActivatedRoute, private pveServe: PveService, private router: Router)
  {
      this.playerServ.getOne(parseInt(localStorage.getItem("id")!)).subscribe(data => this.player = data);
  }

  ngOnInit(): void 
  {
    this.route.paramMap.subscribe(
    params => 
    {
      this.pveServe.getOnePve(parseInt(params.get('id')!)).subscribe(data => this.pvePlayer = data);
    });
  }


  beginFight()
  {
    this.pveServe.fight(this.pvePlayer.id, this.player.id).subscribe(
      {
        next: dto => 
        {
          this.results = [];
          this.fightRes = dto;

          this.deActivateButtonAfterFight();

          this.cycleFightMessage();

          this.activateButtonAfterFight();
        },
        error: err=>
        {
          this.backendErr = err.error;
          alert(this.backendErr);
          this.router.navigate(["home"])
        }
      }
    );
  }

  deActivateButtonAfterFight()
  {
    this.buttonOn = false;
  }

  activateButtonAfterFight()
  {
    setTimeout(() => 
    {
      this.buttonOn = true;
    }, this.fightRes.results.length * 1500); // 1000 ms = 1 secondo
  }

  setPlayerDamageVisibility(): void {
    // Set visibility to "visible"
    this.playerDamageVisibility = "visible";
    
    // After 1500ms, set it back to "hidden"
    setTimeout(() => {
      this.playerDamageVisibility = "hidden";
    }, 1000);
  }

  setEnemyDamageVisibility():void
  {
    
    this.enemyDamageVisibility = "visible";
    
    // After 1500ms, set it back to "hidden"
    setTimeout(() => {
      this.enemyDamageVisibility = "hidden";
    }, 1000);
  }

  cycleFightMessage()
  {
    this.fightRes.results.forEach((result, index) => 
    {
        setTimeout(() => 
        {
          this.results.unshift(result);
          

          if(result.includes("danni"))
            switch (result.split(" ")[0]) 
            {
              case this.player.nick:

                this.enemyDamageReceived = this.pvePlayer.pveHealth;
              
                this.pvePlayer.pveHealth = this.fightRes.enemyHealth[this.pveHealthPos] < 0 ? 0 : this.fightRes.enemyHealth[this.pveHealthPos];

                this.enemyDamageReceived -= this.pvePlayer.pveHealth;

                this.pveHealthPos++;

                this.setEnemyDamageVisibility();
                
                break;

              case this.pvePlayer.nick:

                this.playerDamageReceived=this.player.playerHealth;

                this.player.playerHealth = this.fightRes.playerHealth[this.playerHealthPos] < 0 ? 0 : this.fightRes.playerHealth[this.playerHealthPos];

                this.playerDamageReceived-=this.player.playerHealth;

                this.playerHealthPos++;

                this.setPlayerDamageVisibility();

                break;
            
              default:
                break;
            }

            console.log(this.fightRes.results[index])
            if(this.fightRes.results[index].includes("PERSO") || this.fightRes.results[index].includes("VINTO"))
            {
              this.callEndScreen(2000)
            }

        }, index * 1500); // 1000 ms = 1 secondo
    });

  }

  callEndScreen(index :number) : void
  {
    setTimeout(() => 
      {
        this.endVisibility=true;
      },index
    );
  }



}
