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

  constructor(
    private http: HttpClient,
    private router: Router) {}

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
      next: (res: any) => {
        this.initAuth(res.token);
        console.log(res.user);
        this.user = new User(
          res.user.id, res.user.username, res.user.email, res.user.roles, res.user.allDataProvide,
          res.user.age, res.user.sex, res.user.orientation, res.user.location, res.user.images
        );
        this.router.navigate(['/app/profile']);
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
      next: (res: any) => {
        this.initAuth(res.token);
        console.log(res.user);
        this.user = new User(res.user.id, res.user.username, res.user.email, res.user.roles, res.user.allDataProvide);
        this.router.navigate(['/app/profile']);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  initAuth(token: String){
    console.log(token);
    this.token = token;
    this.headers = {'Authorization': 'Bearer ' + this.token };
    this.authenticated.next(true);
  }

  setUser(user: User){
    this.user = user;
  }

  getUser(): User | undefined {
    return this.user;
  }

  logout(){
    this.token = undefined;
    this.authenticated.next(false);
  }

  deleteUser(){
    return this.http.delete(this.apiUrl + "user/" + this.user?.id, {headers: this.headers});
  }
}
