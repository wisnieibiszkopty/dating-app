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
    return this.http.post(url, {}, {headers: this.headers});


    // this.webMessagingService.publish({
    //   destination: "/app/notification/" + matchId,
    //   body: JSON.stringify()
    // })

  }

  rejectMatch(userId: string, matchId:string){
    // rejected match cannot be sent to user again
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
