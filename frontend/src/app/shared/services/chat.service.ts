import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient, private authService: AuthService) {}

  // loadAvailableChats(): Observable<any>{
  //
  // }

}
