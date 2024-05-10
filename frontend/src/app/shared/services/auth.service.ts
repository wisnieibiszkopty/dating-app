import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {LoginForm} from "../models/LoginForm";

import {environment} from "../../../environment";
import {BehaviorSubject, Observable} from "rxjs";
import {RegisterForm} from "../models/RegisterForm";
import {User} from "../models/User";
import {UserOverview} from "../models/UserOverview";


@Injectable({
  providedIn: 'root'
})
export class AuthService{
  private apiUrl: string = environment.apiUrl;
  private token: BehaviorSubject<string> = new BehaviorSubject<string>("");
  private user: BehaviorSubject<User> = new BehaviorSubject<User>(new User("", "", "", [""], false));
  private headers: any;
  private authenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private notificationsCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);

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

      const notificationCountFromStorage = localStorage.getItem("notificationCount");
      if(notificationCountFromStorage !== null){
        this.notificationsCount.next(JSON.parse(notificationCountFromStorage));
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
        console.log(res);
        console.log(res.user);
        this.setUser(res.user);
        this.setNotificationCount(res.notificationCount);
        //this.webMessageService.connect(res.user.id);
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
        this.setUser(new User(res.user.id, res.user.username, res.user.email, res.user.roles, res.user.allDataProvided));
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
    environment.authToken = token;
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

  getUserOverview(): UserOverview{
    const user = this.user.value;
    const image = user.images && user.images.length > 0 ? user.images[0] : undefined;
    return new UserOverview(user.id, user.username, image);
  }

  getUserAsObservable(): Observable<User> {
    // if website will be refreshed by browser user will be gone :<
    return this.user.asObservable();
  }

  getToken(): string {
    return this.token.value;
  }

  getTokenAsObservable(): Observable<string>{
    return this.token.asObservable();
  }

  setNotificationCount(count: number): void{
    console.log(count);
    this.notificationsCount.next(count);
    localStorage.setItem("notificationCount", JSON.stringify(count));
  }

  incrementNotificationCount(): void {
    const currentValue = this.notificationsCount.value;
    this.notificationsCount.next(currentValue + 1);
    localStorage.setItem("notificationCount", JSON.stringify(currentValue));
  }

  getNotificationCount(): Observable<number>{
    console.log("notifications: " + this.notificationsCount.value);
    return this.notificationsCount.asObservable();
  }

  logout(){
    this.token.next("");
    this.headers = {'Authorization': 'Bearer ' + this.token };
    this.authenticated.next(false);
  }
}
