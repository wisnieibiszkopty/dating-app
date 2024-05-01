import {Injectable, OnInit} from "@angular/core";
import {AuthService} from "./auth.service";
import {HttpClient} from "@angular/common/http";
import {enviroment} from "../../../enviroment";
import {Observable, Subscription} from "rxjs";
import {User} from "../models/User";

@Injectable({ providedIn: 'root'})
export class UserService implements OnInit{
  private apiUrl: String = enviroment.apiUrl + "user/";
  private headers: any;
  private token?: String;
  private user: User = new User("", "", "", [""], false);
  private authSubscription: Subscription;
  private userSubscription: Subscription;

  constructor(private authService: AuthService, private http: HttpClient) {
    this.authSubscription = this.authService.getToken().subscribe((token: string) => { this.token = token; });
    this.userSubscription = this.authService.getUserAsObservable().subscribe((user: User) => {this.user = user; });
    this.headers = {'Authorization': 'Bearer ' + this.token };
  }

  ngOnInit(): void {

  }

  uploadPictures(files: File[], filesToDelete?: string[]): Observable<any>{
    console.log("id" + this.user.id);
    let uploadUrl = this.apiUrl + "upload-images/" + this.user.id;

    const formData = new FormData();

    for (let file of files) {
      formData.append('files', file);
    }

    if(filesToDelete){
      for(let file of filesToDelete){
        formData.append('filesToDelete', file);
      }
    } else {
      formData.append('filesToDelete', "");
    }

    console.log(formData);

    // images and images to delete in body
    return this.http.post(uploadUrl, formData, {headers: this.headers});
  }

  updateUserData(){

  }
}
