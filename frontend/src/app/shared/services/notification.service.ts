import {Injectable} from "@angular/core";
import {environment} from "../../../environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {map} from "rxjs";


@Injectable({providedIn: 'root'})
export class NotificationService{
  private apiUrl: string = environment.apiUrl + "notifications";
  private headers: any;
  private token: string = environment.authToken;
  private page: number = 0;
  private last: boolean = false;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.headers = {'Authorization': 'Bearer ' + this.token };
  }

  getNotifications(){
    const url = this.apiUrl + "/" + this.authService.getUser().id;
    const headers = {'Authorization': 'Bearer ' + this.authService.getToken()};
    return this.http.get(url, {
      params: new HttpParams().set('page', this.page.toString()),
      headers: headers}).pipe(
        map((res: any) => {
          console.log("in service");
          console.log(res);
          if(!res.last){
            this.page ++;
          } else {
            this.last = true;
          }

          return res.content;
        })
    );
  }

  acceptInvitation(notificationId: string){
    const url = this.apiUrl + "/accept/" + notificationId;
    const headers = {'Authorization': 'Bearer ' + this.authService.getToken()};

    // works good, returns error
    this.http.post(url, {}, {headers: headers}).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: err => {
        console.error(err);
      }
    });
  }

  rejectInvitation(){

  }
}
