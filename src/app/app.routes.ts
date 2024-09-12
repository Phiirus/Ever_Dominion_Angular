import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FightPageComponent } from './fight-page/fight-page.component';
import { GearCardComponent } from './gear-card/gear-card.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { PlayerDetailComponent } from './player-detail/player-detail.component';
import { LoggedGuardService } from './services/guards/logged-guard.service';
import { ShopPageComponent } from './shop-page/shop-page.component';
import { FriendlistComponent } from './friendlist/friendlist.component';
import { PveFightPageComponent } from './pve-fight-page/pve-fight-page.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ProfileCardOtherComponent } from './profile-card-other/profile-card-other.component';

export const routes: Routes = 
[
    {path: "", component: LoginPageComponent},
    {path: "login", component: LoginPageComponent},
    {path: "aboutus", component: AboutUsComponent},
    {path: "home", component: HomeComponent, canActivate: [LoggedGuardService]},
    {path: "player", component: PlayerDetailComponent, canActivate: [LoggedGuardService]},
    {path: "shop", component: ShopPageComponent, canActivate: [LoggedGuardService]},
    {path: "friendlist", component: FriendlistComponent, canActivate: [LoggedGuardService]},
    {path: 'fight/:id', component: FightPageComponent, canActivate: [LoggedGuardService]},
    {path: 'pveFight/:id', component: PveFightPageComponent, canActivate: [LoggedGuardService]},
    {path: 'inspect/:id', component: ProfileCardOtherComponent, canActivate: [LoggedGuardService]},
];
