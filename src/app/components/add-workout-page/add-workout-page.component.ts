import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { tap } from 'rxjs/operators'
import { WorkoutCard } from '../workouts-list-page/models/models'
import { combineLatest } from 'rxjs'
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper'

const bikeTypeMap = {
  any: 'Любой',
  road: 'Шоссе',
  cx: 'CX',
  mtb: 'MTB'
}

@Component({
  selector: 'app-add-workout-page',
  templateUrl: './add-workout-page.component.html',
  styleUrls: [ './add-workout-page.component.scss' ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {
        displayDefaultIndicatorType: false
      }
    }
  ]
})
export class AddWorkoutPageComponent implements OnInit {
  public isLinear = true

  public dateFormGroup: FormGroup = this.formBuilder.group({
    date: [ new Date(), Validators.required ]
  })

  public routeFormGroup: FormGroup = this.formBuilder.group({
    from: [ null, Validators.required ],
    to: [ null, Validators.required ],
    isCycledRoute: [ false ]
  })

  public bikeTypeFormGroup: FormGroup = this.formBuilder.group({
    bikeType: [ null, Validators.required ]
  })

  public detailsFormGroup: FormGroup = this.formBuilder.group({
    distance: [ null, Validators.required ],
    speed: [ null ],
    duration: [ null ]
  })

  public workoutSummary = combineLatest([
    this.routeFormGroup.valueChanges,
    this.bikeTypeFormGroup.valueChanges,
    this.detailsFormGroup.valueChanges
  ]).pipe(
    tap(([ route, type, details ]) => {
      this.workout = {
        workoutType: 'rc',
        date: new Date().toISOString(),
        routePoints: route.isCycledRoute ? [ route.from, route.to, route.from ] : [ route.from, route.to ],
        oneWayRoute: false,
        distance: details.distance,
        speed: details.speed,
        duration: details.duration,
        bikeType: bikeTypeMap[ type.bikeType ],
        members: [],
      }
    })
  )

  public workout: WorkoutCard = {
    workoutType: 'rc',
    date: new Date().toISOString(),
    routePoints: [ '' ],
    oneWayRoute: false,
    distance: 0,
    speed: 0,
    bikeType: 'Любой',
    members: [],
  }

  public minDate: Date

  constructor(private formBuilder: FormBuilder) {
    this.minDate = new Date()
  }

  public ngOnInit(): void {
    this.workoutSummary.subscribe()
  }

  public onSecondStep(): void {
    this.bikeTypeFormGroup.markAsTouched()
  }

  public onSubmit(): void {
  }
}
