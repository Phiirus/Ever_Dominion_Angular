import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fight } from '../model/Fight';
import { Player } from '../model/Player';
import { interval, Observable, Subscription } from 'rxjs';
import { Chat } from '../model/Chat';

@Injectable({
  providedIn: 'root'
})
export class PlayerService 
{
  constructor(private http: HttpClient){}

  public playerId: number = parseInt(localStorage.getItem("id")!);
  private heartbeatSubscription!: Subscription;
  
  fight(body: Fight): Observable<Fight>
  {
    return this.http.post<Fight>("/api/player/fight", body); 
  }

  getAll(): Observable<Player[]>
  {
    return this.http.get<Player[]>("/api/player");
  }
  
  getOne(id:number): Observable<Player>
  {
    return this.http.get<Player>(`/api/player/${id}`);
  }

  insert(body:Player): Observable<Player>
  {
    return this.http.post<Player>("/api/player", body);
  }

  switchTroopState(troopId:number): Observable<Player>
  {
    return this.http.post<Player>(`/api/player/switch`, troopId);
  }

  switchGearState(gearId:number, playerId: number): Observable<Player>
  {
    return this.http.post<Player>(`/api/player/${playerId}/switch`, gearId);
  }

  isLogged(): boolean
  {
    if(localStorage.getItem("token"))
      return true;

    return false;
  }

  getFriends(playerId:number): Observable<Player[]>
  {
    return this.http.get<Player[]>(`/api/player/${playerId}/friends`);
  }

  addFriend(id:number, playerId:number): Observable<Player>
  {
    return this.http.post<Player>(`/api/player/add/${id}`, playerId);
  }

  removeFriend(id:number, playerId:number): Observable<Player>
  {
    return this.http.post<Player>(`/api/player/remove/${id}`, playerId);
  }

  getOnlineFriends(playerId: number): Observable<Player[]> 
  {
    return this.http.get<Player[]>(`api/player/${playerId}/online-friends`);
  }

  sendHeartbeat(playerId: number): Observable<void> 
  {
    return this.http.post<void>(`api/player/${playerId}/heartbeat`, {});
  }

  sendPlayerOffline(playerId: number): void  
  {
    this.http.post(`api/player/${playerId}/offline`, {}, {responseType: "text"}).subscribe();
  }

  switchIcon(playerId: number, newIcon: string): Observable<Player>  
  {
    return this.http.post<Player>(`api/player/${playerId}/icon`, newIcon);
  }

  startHeartbeat(): void 
  {
    if(parseInt(localStorage.getItem("id")!))
      this.heartbeatSubscription = interval(60000).subscribe(() =>
      {
        this.sendHeartbeat(this.playerId).subscribe();
      });
  }

  stopHeartbeat(playerId: number): void 
  {
    if (this.heartbeatSubscription)
      this.heartbeatSubscription.unsubscribe();
    
    this.sendPlayerOffline(playerId);
  }

  getPlayersNoShield(): Observable<Player[]>
  {
    return this.http.get<Player[]>(`api/player/noShield`);
  }

  sendMessage(chat: Chat): void
  {
    this.http.post(`api/chat`, chat).subscribe();
  }
}
