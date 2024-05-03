import {Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {HomeComponent} from "./components/home/home.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";

import {ProfileComponent} from "./components/auth-app/profile/profile.component";
import {ChatsComponent} from "./components/auth-app/chats/chats.component";
import {allDataProvidedGuard, notAllDataProvidedGuard} from "./shared/guards/auth.guard";
import {AuthAppComponent} from "./components/auth-app/auth-app.component";
import {UserDetailsComponent} from "./components/auth-app/user-details/user-details.component";
import {MatchingComponent} from "./components/auth-app/matching/matching.component";
import {NotificationComponent} from "./components/auth-app/notification/notification.component";

export const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'app', component: AuthAppComponent, children: [
      { path: 'matching', component: MatchingComponent, canActivate: [allDataProvidedGuard]},
      { path: 'chats', component: ChatsComponent, canActivate: [allDataProvidedGuard]},
      { path: 'notifications', component: NotificationComponent, canActivate: [allDataProvidedGuard]},
      { path: 'profile', component: ProfileComponent, canActivate: [allDataProvidedGuard]},
      { path: 'user-details', component: UserDetailsComponent, canActivate: [notAllDataProvidedGuard]}
    ]},
  { path: '**', component: PageNotFoundComponent}
];
