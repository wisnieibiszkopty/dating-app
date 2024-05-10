import {Component, Input} from '@angular/core';
import {Notification} from "../../shared/models/Notification";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-toast-content',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './toast-content.component.html',
  styleUrl: './toast-content.component.css'
})
export class ToastContentComponent {
  @Input() notification: Notification | undefined;
}
