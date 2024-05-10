import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuItem, MenuItemCommandEvent, MessageService} from "primeng/api";
import {MenuModule} from "primeng/menu";
import {BadgeModule} from "primeng/badge";
import {AuthService} from "../../shared/services/auth.service";
import {Subscription} from "rxjs";
import {WebMessagingService} from "../../shared/services/web-messaging.service";
import {ButtonModule} from "primeng/button";
import {Message} from "@stomp/stompjs";
import {Notification} from "../../shared/models/Notification";
import {ToastModule} from "primeng/toast";
import {ToastContentComponent} from "../toast-content/toast-content.component";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    MenuModule,
    BadgeModule,
    ButtonModule,
    ToastModule,
    ToastContentComponent
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
  providers: [MessageService]
})
export class MenuComponent implements OnInit, OnDestroy{

  actualNotification: Notification | undefined;
  notificationCount: number = 0;
  private notificationCountSubscription: Subscription;
  private topicSubscription: Subscription;

  items: MenuItem[] = [
    {
      label: "Match",
      routerLink: ['/app/matching']
    },
    {
      label: "Chats",
      routerLink: ["/app/chats"]
    },
    {
      label: "Notifications",
      routerLink: ["/app/notifications"]
    },
    {
      label: "Profile",
      routerLink: ["/app/profile"]
    },
    {
      label: "Logout",
      command(event: MenuItemCommandEvent) {
        console.log("test");
      }
    }
  ];

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private webMessagingService: WebMessagingService){
    // Getting notification status from server
    this.notificationCountSubscription = this.authService
      .getNotificationCount()
      .subscribe((count) => {
        this.notificationCount = count;
      });

    // Getting incoming notification
    // this.notificationSubscription = this.webMessagingService
    //   .getNotification()
    //   .subscribe((notification: Notification) => {
    //     this.notificationCount++;
    // });

    this.topicSubscription = this.webMessagingService.watch("/queue/notification/" + this.authService.getUser().id)
      .subscribe((message: Message) => {
        this.actualNotification = JSON.parse(message.body);
        this.authService.incrementNotificationCount();

        // making toast with notification info and link to notification component
        this.messageService.add({
          key: 'notification',
          severity: 'success',
          summary: 'new notification'
        });
    });
  }

  ngOnInit(): void {

  }
  ngOnDestroy(): void {
    this.notificationCountSubscription.unsubscribe();
    this.topicSubscription.unsubscribe();
  }
}
