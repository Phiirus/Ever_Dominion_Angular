import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TroopInShop } from '../model/TroopInShop';
import { Observable } from 'rxjs';
import { Gear } from '../model/Gear';
import { Troop } from '../model/Troop';
import { Player } from '../model/Player';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private http: HttpClient){}

  getShopTroops(): Observable<TroopInShop[]>
  {
    return this.http.get<TroopInShop[]>("/api/shop/troops");
  }

  getShopGears(): Observable<Gear[]>
  {
    return this.http.get<Gear[]>("/api/shop/gears");
  }

  buyTroop(troopId: number, player: Player): Observable<Player>
  {
    return this.http.post<Player>(`/api/shop/troop/${troopId}`, player);
  }

  buyGear(gearId: number, player: Player): Observable<Player>
  {
    return this.http.post<Player>(`/api/shop/gear/${gearId}`, player);
  }

  upgradeGear(gearId: number, player: Player): Observable<Player>
  {
    return this.http.post<Player>(`/api/shop/upgrade/${gearId}`, player);
  }

  buyStamina(playerId: number): Observable<Player>
  {
    console.log(playerId)
    return this.http.post<Player>(`/api/shop/${playerId}/stamina`, {});
  }

  sellTroop(troopId: number): Observable<Player>
  {
    let playerId: number = parseInt(localStorage.getItem("id")!)

    return this.http.post<Player>(`/api/shop/sell/${troopId}`, playerId);
  }
}
