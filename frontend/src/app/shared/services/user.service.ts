import {Injectable, OnDestroy, OnInit} from "@angular/core";
import {AuthService} from "./auth.service";
import {HttpClient} from "@angular/common/http";
import {enviroment} from "../../../enviroment";
import {Observable, Subscription} from "rxjs";
import {User} from "../models/User";
import {BasicInfo} from "../models/BasicInfo";
import {Preference} from "../models/Preference";
import {Router} from "@angular/router";

@Injectable({ providedIn: 'root'})
export class UserService implements OnInit, OnDestroy{
  private apiUrl: string = enviroment.apiUrl + "user";
  private headers: any;
  private token?: string;
  private user: User = new User("", "", "", [""], false);
  private authSubscription: Subscription;
  private userSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router
  ) {
    this.authSubscription = this.authService.getToken().subscribe((token: string) => { this.token = token; });
    this.userSubscription = this.authService.getUserAsObservable().subscribe((user: User) => {this.user = user; });
    this.headers = {'Authorization': 'Bearer ' + this.token };
  }

  ngOnInit(): void {

  }

  // handle data change
  getUser(): User{
    return this.user;
  }

  // UPDATE IMAGES IN USER
  uploadPictures(files: File[], filesToDelete?: string[]): Observable<any>{
    console.log("id" + this.user.id);
    let uploadUrl = this.apiUrl + "/upload-images/" + this.user.id;

    const formData = new FormData();

    for (let file of files) {
      formData.append('files', file);
    }

    // something is wrong with filesToDelete -> function returns error, although files are uploaded to server
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

  updateUserData(basicInfo: BasicInfo, description: string, location: string, preference: Preference){
    // copy of user
    let user = { ...this.user };

    // basicInfo provides string data which has to be mapped to boolean
    user.sex = basicInfo.sex === "male";
    user.orientation = basicInfo.orientation;
    user.age = basicInfo.age;
    user.description = description
    user.location = location;
    user.preference = preference;

    this.http.patch(this.apiUrl, user, {headers: this.headers}).subscribe({
      next: (res) => {
        this.user = user;
        this.user.allDataProvided = true;
        this.authService.setUser(this.user);
        console.log("res update porifle");
        // why it don't work?????
        this.router.navigate(['/app/profile']);
      },
      error: err => {
        console.error(err);
      }
    })
  }

  deleteUser(){
    return this.http.delete(this.apiUrl + "user/" + this.user.id, {headers: this.headers});
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.authSubscription.unsubscribe();
  }
}
