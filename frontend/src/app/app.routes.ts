import { Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {HomeComponent} from "./components/home/home.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {AuthAppComponent} from "./components/auth-app/auth-app.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {ChatsComponent} from "./components/chats/chats.component";

export const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  // need some other component as container for components
  // which only authenticated user can see
  { path: 'app', component: AuthAppComponent, children: [
      { path: 'chats', component: ChatsComponent},
      { path: 'profile', component: ProfileComponent}
    ]},
  { path: '**', component: PageNotFoundComponent}
];
