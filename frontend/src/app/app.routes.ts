import { Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {HomeComponent} from "./components/home/home.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";

export const routes: Routes = [
  { path: '/login', component: LoginComponent},
  { path: '/register', component: RegisterComponent},
  { path: '/app', component: HomeComponent, children: [

    ]},
  { path: '**', component: PageNotFoundComponent}
];
