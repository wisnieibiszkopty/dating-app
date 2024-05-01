import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-chats',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.css'
})
export class ChatsComponent {

  constructor(private authService: AuthService){}

  checkUserData(){
    console.log(this.authService.getUser());
  }

}
