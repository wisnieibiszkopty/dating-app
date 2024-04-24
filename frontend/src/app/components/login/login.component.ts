import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {RouterLink} from "@angular/router";
import {FormsModule, NgForm} from "@angular/forms";
import {LoginForm} from "../../models/LoginForm";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule
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
