import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  constructor(private authService: AuthService){}

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
