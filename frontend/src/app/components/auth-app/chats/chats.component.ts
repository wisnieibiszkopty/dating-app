import {Component} from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";
import {RouterLink} from "@angular/router";
import {ChatsListComponent} from "./chats-list/chats-list.component";
import {ChatsElementComponent} from "./chats-element/chats-element.component";

@Component({
  selector: 'app-chats',
  standalone: true,
  imports: [
    RouterLink,
    ChatsListComponent,
    ChatsElementComponent
  ],
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.css'
})
export class ChatsComponent {

  constructor(private authService: AuthService){}


}
