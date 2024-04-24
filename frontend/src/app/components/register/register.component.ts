import {Component, OnInit} from '@angular/core';
import {RegisterForm} from "../../models/RegisterForm";
import {AuthService} from "../../services/auth.service";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  // add validators etc
  registerForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl('')
  });

  constructor(private authService: AuthService){}

  ngOnInit() {

  }

  onSubmit(form: FormGroup){
    console.log(form.valid);
    console.log(form.value);

    this.authService.register(form.value);
  }
}
