import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuItem, MenuItemCommandEvent} from "primeng/api";
import {MenuModule} from "primeng/menu";
import {BadgeModule} from "primeng/badge";
import {AuthService} from "../../shared/services/auth.service";
import {Subscription} from "rxjs";
import {WebMessagingService} from "../../shared/services/web-messaging.service";
import {ButtonModule} from "primeng/button";
import {Message} from "@stomp/stompjs";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    MenuModule,
    BadgeModule,
    ButtonModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit, OnDestroy{

  notificationCount: number = 0;
  private notificationCountSubscription: Subscription;
  //private notificationSubscription: Subscription;
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

  constructor(private authService: AuthService, private webMessagingService: WebMessagingService){
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

    this.topicSubscription = this.webMessagingService.watch("/topic/hello")
      .subscribe((message: Message) => {
        console.log(message.body);
    });
  }

  ngOnInit(): void {

  }

  hello(){
    const message = "jazda" + new Date();
    console.log("message to send " + message);
    this.webMessagingService.publish({
      destination: "/topic/hello",
      body: message
    })
  }

  ngOnDestroy(): void {
    this.notificationCountSubscription.unsubscribe();
    //this.notificationSubscription.unsubscribe();
    this.topicSubscription.unsubscribe();
  }
}
