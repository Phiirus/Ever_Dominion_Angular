import { AfterViewInit, Component, ElementRef, HostListener, Injector, ViewChild } from '@angular/core';
import { PlayerService } from './services/player.service';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { StompService } from './services/stomp.service';
import { Player } from './model/Player';
import { HttpClient } from '@angular/common/http';
import { GearCardComponent } from "./gear-card/gear-card.component";
import { ChatboxComponent } from "./chatbox/chatbox.component";
import { FightResultComponent } from "./fight-result/fight-result.component";
import { BellComponent } from "./bell/bell.component";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet, GearCardComponent, ChatboxComponent, FightResultComponent, BellComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent
{
  title = 'EverDominion';
  player!: Player;
  stomp: StompService;
  lastShield!: string;
  audio: any = new Audio("https://audio.jukehost.co.uk/r3beBJdru2r5fpbF12JOHcajjKH0unf1");

  private playerId: number = parseInt(localStorage.getItem("id")!);
  @ViewChild(NavbarComponent) navbar!: NavbarComponent;

  constructor(private playerService: PlayerService, private injector: Injector, private http:HttpClient) 
  {
    this.stomp = this.injector.get(StompService);

    this.playerService.getOne(parseInt(localStorage.getItem("id")!)).subscribe(data => this.player = data);

    this.stomp.subscribe("/topic/players", message =>
    {
      let playersData = JSON.parse(message) as Player[];
      this.player = playersData ? playersData.filter(p => p.id == parseInt(localStorage.getItem("id")!)).at(0)! : this.player;
     
      if(this.lastShield == null)
        this.lastShield =  this.player.shield

      if(this.lastShield  != this.player.shield)
      {
        this.lastShield = this.player.shield;
        this.navbar.startTimer();
      }
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void 
  {
    this.audioPlay()
  }

  audioPlay()
  {
    if(this.audio.currentTime == 0)
    {
      this.audio.volume = 0.01;
      this.audio.play();
    }
  }

  ngOnInit(): void 
  {
    if(this.playerService.isLogged())
    {
      this.playerService.startHeartbeat(); 
      this.playerService.sendHeartbeat(this.playerId!).subscribe();
    }

    window.addEventListener("beforeunload", () => this.http.post(`api/player/${parseInt(localStorage.getItem("id")!)}/offline`, {}, {responseType: "text"}).subscribe());  //setta offline il player se chiude la pagina
  }

  ngOnDestroy(): void 
  {
    this.playerService.stopHeartbeat(this.playerId!);
  }

  // beforeUnloadHandler(event: BeforeUnloadEvent) 
  // {
  //   // this.playerService.stopHeartbeat(this.playerId!);
  //   this.http.get("api/player/test").subscribe()
  // }

  // @HostListener('window:beforeunload', [ '$event' ])
  // unloadHandler(event) 
  // {
  //   // ...
  // }
}