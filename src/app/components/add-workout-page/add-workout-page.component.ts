import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-add-workout-page',
  templateUrl: './add-workout-page.component.html',
  styleUrls: [ './add-workout-page.component.scss' ]
})
export class AddWorkoutPageComponent implements OnInit {
  isLinear = true;
  public routeFormGroup: FormGroup;
  public bikeTypeFormGroup: FormGroup;
  public detailsFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.routeFormGroup = this.formBuilder.group({
      from: [ null, Validators.required ],
      to: [ null, Validators.required ]
    });
    this.bikeTypeFormGroup = this.formBuilder.group({
      type: [ 'any' ]
    });
    this.detailsFormGroup = this.formBuilder.group({
      speed: [ null, Validators.required ],
      distance: [ null, Validators.required ],
      duration: [ null ]
    });

    this.bikeTypeFormGroup.valueChanges.pipe(
      tap((value) => {
        console.log(value);
      })
    ).subscribe();
  }

  public onSubmit(): void {
    console.log('routeFormGroup', this.routeFormGroup.value);
    console.log('bikeTypeFormGroup', this.bikeTypeFormGroup.value);
    console.log('detailsFormGroup', this.detailsFormGroup.value);
  }
}
