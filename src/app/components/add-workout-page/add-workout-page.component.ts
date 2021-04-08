import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { tap } from 'rxjs/operators'
import { combineLatest } from 'rxjs'
import { STEPPER_GLOBAL_OPTIONS, StepperSelectionEvent } from '@angular/cdk/stepper'
import { ISO8601 } from '../../models/base.model'
import { BikeType, bikeTypeMap, WorkoutCard } from 'src/app/models/workout.model'


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
  public minDate: Date
  public bikeTypeMap = bikeTypeMap
  public bikeTypes = Object.keys(this.bikeTypeMap)
  private currentStepElement: HTMLElement | null = null

  public dateFormGroup = new FormGroup({
    date: new FormControl(null, Validators.required),
    time: new FormControl(null, Validators.required)
  })

  public routeFormGroup = new FormGroup({
    from: new FormControl(null, Validators.required),
    to: new FormControl(null, Validators.required),
    isCycledRoute: new FormControl(false)
  })

  public venueFormGroup = new FormGroup({
    place: new FormControl(null, Validators.required)
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
    this.venueFormGroup.valueChanges,
    this.bikeTypeFormGroup.valueChanges,
    this.detailsFormGroup.valueChanges
  ]).pipe(
    tap(([ dateForm, routeForm, venueForm, typeForm, detailsForm ]) => {
      const dateObject = {
        year: dateForm.date.getFullYear(),
        month: (dateForm.date.getMonth() + 1).toString().padStart(2, '0'),
        date: dateForm.date.getDate().toString().padStart(2, '0')
      }
      const dateString = `${ dateObject.year }-${ dateObject.month }-${ dateObject.date }T${ dateForm.time }:00`

      this.workout = {
        workoutType: null,
        date: new Date(dateString).toISOString() as ISO8601,
        routePoints: routeForm.isCycledRoute ? [ routeForm.from, routeForm.to, routeForm.from ] : [ routeForm.from, routeForm.to ],
        oneWayRoute: false,
        venue: venueForm.place,
        distance: detailsForm.distance,
        speed: detailsForm.speed,
        duration: detailsForm.duration,
        bikeType: typeForm.bikeType,
        members: [],
      }
    })
  )

  public workout: WorkoutCard = {
    workoutType: null,
    date: new Date().toISOString() as ISO8601,
    routePoints: [ '' ],
    oneWayRoute: false,
    venue: '',
    distance: 0,
    speed: 0,
    bikeType: null,
    members: [],
  }

  constructor() {
    this.workoutSummary.subscribe()
    this.minDate = new Date()
  }

  public ngOnInit(): void {
    this.dateFormGroup.controls.date.patchValue(new Date())
    this.dateFormGroup.controls.time.patchValue('08:00')
    this.bikeTypeFormGroup.controls.bikeType.patchValue(BikeType.any)
  }

  public onSelectionChange(event: StepperSelectionEvent): void {
    const { selectedStep } = event
    this.currentStepElement = selectedStep.stepLabel.template.elementRef.nativeElement.parentElement
  }

  public onAnimationDone(): void {
    if (this.currentStepElement !== null) {
      this.currentStepElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  public onSubmit(): void {
  }
}
