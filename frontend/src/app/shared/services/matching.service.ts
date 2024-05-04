import {Injectable, OnDestroy} from "@angular/core";
import {environment} from "../../../environment";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Subscription} from "rxjs";
import {WebMessagingService} from "./web-messaging.service";

@Injectable({ providedIn: 'root'})
export class MatchingService implements OnDestroy{
  private apiUrl: string = environment.apiUrl + "matching";
  private headers: any;
  private token?: string;
  private authSubscription: Subscription;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private webMessagingService: WebMessagingService) {
    this.authSubscription = this.authService.getTokenAsObservable().subscribe((token: string) => { this.token = token; });
    this.headers = {'Authorization': 'Bearer ' + this.token };
  }

  loadMatchingUsers(){
    return this.http.get(this.apiUrl, {headers: this.headers});
  }

  acceptMatch(matchId: string){
    const url = this.apiUrl + "/accept/" + matchId;
    // this.http.post(url, {}, {headers: this.headers}).subscribe({
    //   next: (res) => {
    //     console.log(res);
    //   },
    //   error: err => {
    //     console.error(err);
    //   }
    // });

    //this.webMessagingService.sendNotification(matchId, "nigga");
  }

  rejectMatch(userId: string, matchId:string){

  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
