import { Component } from '@angular/core';
import {ChatService} from "../../../../shared/services/chat.service";

@Component({
  selector: 'app-chats-list',
  standalone: true,
  imports: [],
  templateUrl: './chats-list.component.html',
  styleUrl: './chats-list.component.css'
})
// on init load chats for user
export class ChatsListComponent {

  constructor(private chatService: ChatService) {

  }

}
