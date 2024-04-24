import { Component } from '@angular/core';
import {RegisterForm} from "../../models/RegisterForm";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  model: RegisterForm = new RegisterForm("", "", "", "");

  constructor(private authService: AuthService){}

  onSubmit(){
    console.log(this.model);

    this.authService.register(this.model);
  }
}
