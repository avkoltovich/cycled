import { AfterViewInit, Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
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
export class AddWorkoutPageComponent implements OnInit, AfterViewInit {
  public isLinear = true

  public dateFormGroup = new FormGroup({
    date: new FormControl(null, Validators.required),
    time: new FormControl(null, Validators.required)
  })

  public routeFormGroup = new FormGroup({
    from: new FormControl(null, Validators.required),
    to: new FormControl(null, Validators.required),
    isCycledRoute: new FormControl(false)
  })

  public bikeTypeFormGroup = new FormGroup({
    bikeType: new FormControl(null, Validators.required)
  })

  public detailsFormGroup = new FormGroup({
    distance: new FormControl(null, Validators.required),
    speed: new FormControl(null),
    duration: new FormControl(null)
  })

  public workoutSummary = combineLatest([
    this.dateFormGroup.valueChanges,
    this.routeFormGroup.valueChanges,
    this.bikeTypeFormGroup.valueChanges,
    this.detailsFormGroup.valueChanges
  ]).pipe(
    tap(([ dateForm, routeForm, typeForm, detailsForm ]) => {
      const dateObject = {
        year: dateForm.date.getFullYear(),
        month: (dateForm.date.getMonth() + 1).toString().padStart(2, '0'),
        date: dateForm.date.getDate().toString().padStart(2, '0')
      }
      const dateString = `${ dateObject.year }-${ dateObject.month }-${ dateObject.date }T${ dateForm.time }:00`

      this.workout = {
        workoutType: null,
        date: new Date(dateString).toISOString(),
        routePoints: routeForm.isCycledRoute ? [ routeForm.from, routeForm.to, routeForm.from ] : [ routeForm.from, routeForm.to ],
        oneWayRoute: false,
        distance: detailsForm.distance,
        speed: detailsForm.speed,
        duration: detailsForm.duration,
        bikeType: bikeTypeMap[ typeForm.bikeType ],
        members: [],
      }
    })
  )

  public workout: WorkoutCard = {
    workoutType: null,
    date: new Date().toISOString(),
    routePoints: [ '' ],
    oneWayRoute: false,
    distance: 0,
    speed: 0,
    bikeType: null,
    members: [],
  }

  public minDate: Date

  constructor() {
    this.minDate = new Date()
  }

  public ngOnInit(): void {
    this.workoutSummary.subscribe()
  }

  public ngAfterViewInit(): void {
    this.dateFormGroup.controls.date.patchValue(new Date())
    this.dateFormGroup.controls.time.patchValue('08:00')
    this.bikeTypeFormGroup.controls.bikeType.patchValue('any')
  }

  public onSecondStep(): void {
    this.bikeTypeFormGroup.markAsTouched()
  }

  public onSubmit(): void {
  }
}
