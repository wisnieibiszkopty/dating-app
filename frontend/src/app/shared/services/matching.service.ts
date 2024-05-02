import {Injectable, OnDestroy} from "@angular/core";
import {enviroment} from "../../../enviroment";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Observable, Subscription} from "rxjs";
import {MatchingUser} from "../models/MatchingUser";

@Injectable({ providedIn: 'root'})
export class MatchingService implements OnDestroy{
  private apiUrl: string = enviroment.apiUrl + "matching";
  private headers: any;
  private token?: string;
  private authSubscription: Subscription;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authSubscription = this.authService.getToken().subscribe((token: string) => { this.token = token; });
    this.headers = {'Authorization': 'Bearer ' + this.token };
  }

  loadMatchingUsers(){
    return this.http.get(this.apiUrl, {headers: this.headers});
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
