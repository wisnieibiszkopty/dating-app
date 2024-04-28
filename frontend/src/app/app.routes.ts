import { Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {HomeComponent} from "./components/home/home.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";

import {ProfileComponent} from "./components/profile/profile.component";
import {ChatsComponent} from "./components/chats/chats.component";
import {authGuard, guestGuard} from "./guards/auth.guard";
import {AuthAppComponent} from "./components/auth-app/auth-app.component";

export const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'app', component: AuthAppComponent, children: [
      { path: 'chats', component: ChatsComponent},
      { path: 'profile', component: ProfileComponent}
    ]},
  { path: '**', component: PageNotFoundComponent}
];
