import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {LoginForm} from "../models/LoginForm";

import {enviroment} from "../../../enviroment";
import {BehaviorSubject, Observable} from "rxjs";
import {RegisterForm} from "../models/RegisterForm";
import {User} from "../models/User";


@Injectable({
  providedIn: 'root'
})
export class AuthService{
  private apiUrl: string = enviroment.apiUrl;
  private token: BehaviorSubject<string> = new BehaviorSubject<string>("");
  private user: BehaviorSubject<User> = new BehaviorSubject<User>(new User("", "", "", [""], false));
  private headers: any;
  private authenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private router: Router) {
      const tokenFromStorage = localStorage.getItem("token");
      if(tokenFromStorage !== null){
        this.token.next(tokenFromStorage);
      }

      const userFromStorage = localStorage.getItem("user");
      if(userFromStorage !== null){
        this.user.next(JSON.parse(userFromStorage));
      }
  }

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
        let user = new User(
          res.user.id, res.user.username, res.user.email, res.user.roles, res.user.allDataProvided,
          res.user.age, res.user.sex, res.user.orientation, res.user.description,
          res.user.location, res.user.images, res.user.preference
        );
        console.log(user);
        this.setUser(user);
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
        this.setUser(new User(res.user.id, res.user.username, res.user.email, res.user.roles, res.user.allDataProvide));
        this.router.navigate(['/app/profile']);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  initAuth(token: string){
    console.log(token);
    this.token.next(token);
    this.headers = {'Authorization': 'Bearer ' + this.token };
    this.authenticated.next(true);
    localStorage.setItem("token", token);
  }

  setUser(user: User){
    this.user.next(user);
    localStorage.setItem("user", JSON.stringify(user));
  }

  getUser(): User {
    return this.user.value;
  }

  getUserAsObservable(): Observable<User> {
    // if website will be refreshed by browser user will be gone :<
    return this.user.asObservable();
  }

  getToken(): Observable<string>{
    return this.token.asObservable();
  }

  logout(){
    this.token.next("");
    this.authenticated.next(false);
  }

  deleteUser(){
    return this.http.delete(this.apiUrl + "user/" + this.user?.value.id, {headers: this.headers});
  }
}
