import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {ButtonModule} from "primeng/button";
import {SidebarModule} from "primeng/sidebar";
import {MenubarModule} from "primeng/menubar";



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLinkActive, RouterLink, ButtonModule, SidebarModule, MenubarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
  sidebarVisible: boolean = true;
}
