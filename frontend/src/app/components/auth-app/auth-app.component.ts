import {Component, HostListener} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {MenuComponent} from "../menu/menu.component";
import {SidebarModule} from "primeng/sidebar";
import {ButtonModule} from "primeng/button";
import {MenuModule} from "primeng/menu";

@Component({
  selector: 'app-auth-app',
  standalone: true,
  imports: [
    RouterOutlet,
    MenuComponent,
    SidebarModule,
    ButtonModule,
    MenuModule
  ],
  templateUrl: './auth-app.component.html',
  styleUrl: './auth-app.component.css'
})
export class AuthAppComponent {
  isMobile = false;
  sidebarVisible = false;

  // don't work if page is mobile on start
  @HostListener('window:resize', ['$event'])
  onResize(event: any){
    this.isMobile = window.innerWidth < 768;

  }

}
