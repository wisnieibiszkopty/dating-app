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
import {UserService} from "../../shared/services/user.service";
import {Preference} from "../../shared/models/Preference";
import {BasicInfo} from "../../shared/models/BasicInfo";

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

    images: File[] = [];

    sexes = [
      {value: "male", label: 'Male', controlName: "preferredSex1"},
      {value: "female", label: 'Female', controlName: "preferredSex2"}
    ];

    constructor(private userService: UserService) {
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

    // handle file clear and delete
    onFileSelected(event: any){
      for(let file of event.files) {
        this.images.push(file);
      }
    }

    confirmImages(){
      this.userService.uploadPictures(this.images).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: err => {
          console.log(err);
        }
      });
    }

    confirmPreferences(){
      if(this.basicInfoForm.valid &&
        this.descriptionForm.valid &&
        this.locationForm.valid &&
        this.preferencesForm.valid){
          const pref = this.preferencesForm.value;

          console.log(pref);
          console.log(this.basicInfoForm.value);
          console.log(this.locationForm.value);
          console.log(this.descriptionForm.value);
          // let preference = new Preference(
          //   pref.minAge, pref.maxAge, [pref.preferredSex1.value, pref.preferredSex2.value], pref.location
          // );
          console.log(this.basicInfoForm.value.selectedOrientation.orientation);

        const basicInfo = new BasicInfo(
          this.basicInfoForm.value.sex,
          this.basicInfoForm.value.selectedOrientation.orientation,
          this.basicInfoForm.value.age
        )

          this.userService.updateUserData(
            basicInfo,
            this.descriptionForm.value.description,
            this.locationForm.value.location,
            new Preference(20, 20, [false, false], "test"));
      }
    }

}
