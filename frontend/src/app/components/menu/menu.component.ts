import {Component} from '@angular/core';
import {MenuItem, MenuItemCommandEvent} from "primeng/api";
import {MenuModule} from "primeng/menu";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    MenuModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

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

}
