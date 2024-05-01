import {Component} from '@angular/core';
import {StepperModule} from "primeng/stepper";
import {ButtonModule} from "primeng/button";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {RadioButtonModule} from "primeng/radiobutton";
import {DropdownModule} from "primeng/dropdown";
import {PaginatorModule} from "primeng/paginator";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ChipsModule} from "primeng/chips";
import {FileUploadModule} from "primeng/fileupload";
import {CheckboxModule} from "primeng/checkbox";

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [
    StepperModule,
    ButtonModule,
    RadioButtonModule,
    ReactiveFormsModule,
    DropdownModule,
    PaginatorModule,
    InputTextareaModule,
    ChipsModule,
    FileUploadModule,
    CheckboxModule
  ],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})

// TODO Add styling and validation for forms
export class UserDetailsComponent {
    basicInfoForm: FormGroup;
    descriptionForm: FormGroup;
    locationForm: FormGroup;
    preferencesForm: FormGroup;

    orientations = [
      {orientation: "heterosexual"},
      {orientation: "homosexual"},
      {orientation: "bisexual"}
    ];

    images = [];

    sexes = [
      {value: "male", label: 'Male', controlName: "preferredSex1"},
      {value: "female", label: 'Female', controlName: "preferredSex2"}
    ];

    constructor() {
      this.basicInfoForm = new FormGroup({
        sex: new FormControl('', Validators.required),
        selectedOrientation: new FormControl('', Validators.required),
        age: new FormControl('', [Validators.required, Validators.min(18), Validators.max(150)])
      });

      this.descriptionForm = new FormGroup({
        description: new FormControl('', [Validators.required, Validators.maxLength(500)])
      });

      this.locationForm = new FormGroup({
        location: new FormControl('', [Validators.required, Validators.maxLength(50)])
      });

      this.preferencesForm = new FormGroup({
        minAge: new FormControl('', [Validators.required, Validators.min(18), Validators.max(150)]),
        maxAge: new FormControl('', [Validators.required, Validators.min(18), Validators.max(150)]),
        // TODO Add checkboxes validation
        preferredSex1: new FormControl(false),
        preferredSex2: new FormControl(false),
        preferredLocation: new FormControl('', [Validators.required, Validators.maxLength(50)])
      });
    }

    confirmImages(){

    }

    confirmPreferences(){

    }

}
