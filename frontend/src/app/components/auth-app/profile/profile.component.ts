import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {UserService} from "../../../shared/services/user.service";
import {User} from "../../../shared/models/User";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent{

  user: User;

  constructor(private userService: UserService){
    this.user = userService.getUser();
  }

  checkUserData(){
    console.log(this.userService);
  }

  deleteAccount(){
    this.userService.deleteUser().subscribe({
      next: (result) => {
        console.log(result);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
