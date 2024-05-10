import {Component, OnInit} from '@angular/core';
import {Notification} from '../../../shared/models/Notification';
import {NotificationComponent} from "./notification/notification.component";
import {NotificationService} from "../../../shared/services/notification.service";

@Component({
  selector: 'app-notification-list',
  standalone: true,
  imports: [
    NotificationComponent
  ],
  templateUrl: './notification-list.component.html',
  styleUrl: './notification-list.component.css'
})
export class NotificationListComponent implements OnInit{
  notifications: Notification[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.getNotifications().subscribe({
      next: (res: Notification[]) => {
        console.log(res);
        this.notifications = res;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  onAccepted(id: string){
    this.notificationService.acceptInvitation(id);
  }

  onRejected(){

  }

}
