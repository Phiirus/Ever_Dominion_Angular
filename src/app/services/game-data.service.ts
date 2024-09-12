import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Player } from '../model/Player';

@Injectable({
  providedIn: 'root'
})
export class GameDataService
{
  private pollingUrl = `/api/player`; // URL della tua API

  constructor(private http: HttpClient) {}

  // Funzione per avviare il polling
  startPolling(intervalMs: number): Observable<Player[]> 
  {
    return interval(intervalMs).pipe(
      switchMap(() => this.http.get<Player[]>(this.pollingUrl))
    );
  }
}