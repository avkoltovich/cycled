import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-workout-page',
  templateUrl: './add-workout-page.component.html',
  styleUrls: [ './add-workout-page.component.scss' ]
})
export class AddWorkoutPageComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.firstFormGroup = this.formBuilder.group({
      from: [ '', Validators.required ],
      to: [ '', Validators.required ]
    });
    this.secondFormGroup = this.formBuilder.group({
      speed: [ '', Validators.required ],
      distance: [ '', Validators.required ],
      duration: [ '', Validators.required ]
    });
    this.thirdFormGroup = this.formBuilder.group({
      bikeType: [ '', Validators.required ]
    });
  }

}
