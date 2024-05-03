import {Injectable} from "@angular/core";
import {environment} from "../../../environment";
import {HttpClient} from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class NotificationService{
  private apiUrl: string = environment.apiUrl;
  private headers: any;
  private token: string = environment.authToken;

  constructor(private http: HttpClient) {}

  getNotifications(){

  }

}
