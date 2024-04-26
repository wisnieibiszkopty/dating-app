import { Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {HomeComponent} from "./components/home/home.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {AuthAppComponent} from "./components/auth-app/auth-app.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {ChatsComponent} from "./components/chats/chats.component";
import {authGuard, guestGuard} from "./guards/auth.guard";

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [guestGuard]},
  { path: 'login', component: LoginComponent, canActivate: [guestGuard]},
  { path: 'register', component: RegisterComponent, canActivate: [guestGuard]},
  { path: 'app', component: AuthAppComponent, canActivate: [authGuard], children: [
      { path: 'chats', component: ChatsComponent},
      { path: 'profile', component: ProfileComponent}
    ]},
  { path: '**', component: PageNotFoundComponent}
];
