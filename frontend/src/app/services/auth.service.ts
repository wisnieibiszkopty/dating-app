import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {LoginForm} from "../models/LoginForm";

import {enviroment} from "../../enviroment";
import {BehaviorSubject} from "rxjs";
import {RegisterForm} from "../models/RegisterForm";
import {User} from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: String = enviroment.apiUrl;
  private token?: String;
  private user?: User;
  private headers: any;
  private authenticated = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) { }

  isAuthenticated(): boolean {
    return this.authenticated.value;
  }

  authenticate(request: LoginForm){
    let url = this.apiUrl + "auth/login";
    console.log(url);

    this.http.post(url, {
      email: request.email,
      password: request.password
    }).subscribe({
      // i don't know yet what exactly it will return
      next: (response: any) => {
        console.log(response);
        console.log(response.user);
        this.token = response.token;
        this.user = response.user;
        this.headers = {'Authorization': 'Bearer ' + this.token };
        this.authenticated.next(true);
        this.router.navigate(['/app/chats']);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  register(request: RegisterForm){
    let url = this.apiUrl + "auth/register";
    console.log(url);

    this.http.post(url, {
      username: request.username,
      email: request.email,
      password: request.password
    }).subscribe({
      next: (response: any) => {
        console.log(response);
        console.log(response.user);
        this.token = response.token;
        this.user = response.user;
        this.headers = {'Authorization': 'Bearer ' + this.token };
        console.log(this.user);
        this.authenticated.next(true);
        this.router.navigate(['/app/profile']);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  logout(){
    this.token = undefined;
    this.authenticated.next(false);
  }

  deleteUser(){
    return this.http.delete(this.apiUrl + "user/" + this.user?.id, {headers: this.headers});
  }
}
