import {Component, OnDestroy} from '@angular/core';
import {MenuItem, MenuItemCommandEvent} from "primeng/api";
import {MenuModule} from "primeng/menu";
import {BadgeModule} from "primeng/badge";
import {AuthService} from "../../shared/services/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    MenuModule,
    BadgeModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnDestroy{

  notificationCount: number = 0;
  private notificationCountSubscription: Subscription;

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

  constructor(private authService: AuthService){
    this.notificationCountSubscription = this.authService
      .getNotificationCount()
      .subscribe((count) => {
        this.notificationCount = count;
      })
  }

  ngOnDestroy(): void {
    this.notificationCountSubscription.unsubscribe();
  }
}
