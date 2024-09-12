import { Component, inject} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Player } from '../model/Player';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { hasValidPassword } from '../services/validators/hasValidPassword';
import { CommonModule } from '@angular/common';
import { profanityFilter } from '../services/validators/hasValidNick';
import { PlayerService } from '../services/player.service';
import { hasValidEmail } from '../services/validators/hasValidEmail';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent 
{
  constructor(private authService:AuthService, private router: Router, private playerService: PlayerService)
  {
    if(localStorage.getItem("token"))
      this.router.navigate(["home"])
    else
      localStorage.clear();
  }

  webStorage = inject(LocalStorageService);

  loginState: boolean = true;
  player !: Player;
  usernameTakenMessage: string = "";

  registerForm()
  {
    this.loginState = !this.loginState
    this.clearFormErrors()
    this.loginState ? this.newUserForm.get('email')?.setValue("") : this.newUserForm.get('email')?.setValue(null)
    this.loginState ? this.newUserForm.get('username')?.setValue("") : this.newUserForm.get('username')?.setValue(null)
    this.loginState ? this.newUserForm.get('password')?.setValue("") : this.newUserForm.get('password')?.setValue(null)
  }

  newUserForm = new FormGroup(
    {
      email: new FormControl("", [Validators.required, hasValidEmail()]),
      username: new FormControl("", [Validators.required, profanityFilter()]),
      password: new FormControl("", [Validators.required, hasValidPassword()]),
    }
  )

  oldUserForm = new FormGroup(
    {
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    }
  )


  login(username1?: string, password1?: string)
  {
    let username = username1 ? username1 : this.oldUserForm.get('username')?.value;
    let password = password1 ? password1 : this.oldUserForm.get('password')?.value;

    this.authService.login(username!, password!).subscribe(
      {
        next: data =>
        {
          data.user.role = data.role;
          this.player = data.playerDto;
          

          this.webStorage.setItem("token", data.accessToken);
          this.webStorage.setItem("role", data.role);
          this.webStorage.setItem("user", data.user);
          this.webStorage.setItem("username", data.user.username);
          this.webStorage.setItem("id", data.playerDto.id);

          this.playerService.playerId = parseInt(localStorage.getItem("id")!);
          this.playerService.sendHeartbeat(data.playerDto.id).subscribe();
          this.playerService.startHeartbeat();

          this.router.navigate(["home"]);
          window.location.reload();
        },
        error: err=>
        {
          localStorage.clear();
          this.oldUserForm.setErrors({backendError: err.error});
        }
      }
    )
  }


  register()
  {
    let username = this.newUserForm.get('username')!.value!;
    let email = this.newUserForm.get('email')!.value!;
    let password = this.newUserForm.get('password')!.value!;

    this.authService.register(username, password, email).subscribe(
      {
        next: data=>
        {
          this.login(username, password);
        },
        error: err=>
        {
          localStorage.clear();
          this.newUserForm.setErrors({backendError: err.error});
        }
      }
    )
  }

  clearFormErrors() {
    Object.keys(this.newUserForm.controls).forEach(
    key => 
    {
      let control = this.newUserForm.get(key);
      
      if(control != null)
      {
        control.setErrors(null);
        control.markAsPristine();
        control.markAsUntouched();
      }
    });
  }
}
