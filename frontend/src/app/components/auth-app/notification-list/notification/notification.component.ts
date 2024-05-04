import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Notification } from '../../../../shared/models/Notification';
import {UserOverview} from "../../../../shared/models/UserOverview";
import {ButtonModule} from "primeng/button";

// add user profile to show other users when they click on name

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [
    ButtonModule
  ],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {
  @Input() notification: Notification | undefined;
  @Output() accepted: EventEmitter<string> = new EventEmitter<string>();

  acceptInvitation(){
    this.accepted.emit(this.notification?.id);
  }

  rejectInvitation(){

  }
}
