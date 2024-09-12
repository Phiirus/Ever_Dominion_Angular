import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlayerService } from './player.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService 
{
  constructor(private http:HttpClient, private playerService: PlayerService){}

  login(username:string,password:string)
  {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    let body = {'username':username,'password':password};
    return this.http.post<any>("/api/auth/login",body);
  }

  register(username:string,password:string, email: string)
  {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    let body = {'username':username,'password':password,'email': email};
    return this.http.post("/api/auth/register", body, {responseType: "text"}); //se un metodo rilascia testo non si mettono le angolari (.post<any>) ma si mette {responseType: "text"}
  }

  logout(): void
  {
    this.playerService.stopHeartbeat(parseInt(localStorage.getItem("id")!));
    this.playerService.sendPlayerOffline(parseInt(localStorage.getItem("id")!));
    localStorage.clear();
  }

  isLogged(): boolean
  {
    if(localStorage.getItem("token"))
      return true;

    return false;
  }

  getUserRole(): string | null
  {
    return localStorage.getItem("role");
  }

  userHasRole(role: string): boolean
  {
    return this.isLogged() && this.getUserRole()?.toLocaleLowerCase() == role.toLowerCase();
  }
}
