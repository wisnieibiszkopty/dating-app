import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {RouterLink} from "@angular/router";
import {FormsModule, NgForm} from "@angular/forms";
import {LoginForm} from "../../models/LoginForm";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {CardModule} from "primeng/card";
import {InputTextModule} from "primeng/inputtext";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    ButtonModule,
    RippleModule,
    CardModule,
    InputTextModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  model: LoginForm = new LoginForm("", "");

  constructor(private authService: AuthService) {}

  onSubmit(){
    console.log(this.model);

    this.authService.authenticate(this.model);

  }

}
