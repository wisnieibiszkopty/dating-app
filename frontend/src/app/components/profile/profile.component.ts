import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {User} from "../../models/User";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent{

  constructor(private authService: AuthService){}

  checkUserData(){
    console.log(this.authService.getUser());
  }

  deleteAccount(){
    this.authService.deleteUser().subscribe({
      next: (result) => {
        console.log(result);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
