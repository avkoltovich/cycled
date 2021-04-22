import { Component, Input, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { tap } from 'rxjs/operators'
import { combineLatest } from 'rxjs'
import { STEPPER_GLOBAL_OPTIONS, StepperSelectionEvent } from '@angular/cdk/stepper'
import { ISO8601 } from '../../models/base.model'
import { BikeType, bikeTypeMap, WorkoutModel } from 'src/app/models/workout.model'
import { WorkoutNetworkService } from '../../services/workout-network.service'
import { Router } from '@angular/router'
import { WorkoutModelService } from '../../services/workout-model.service'


@Component({
  selector: 'app-edit-workout',
  templateUrl: './edit-workout.component.html',
  styleUrls: [ './edit-workout.component.scss' ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {
        displayDefaultIndicatorType: false
      }
    }
  ]
})
export class EditWorkoutComponent implements OnInit {
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
        ...this.workout,
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

  public workout: Omit<WorkoutModel, '_id'> = {
    workoutType: null,
    date: new Date().toISOString() as ISO8601,
    routePoints: [ '' ],
    oneWayRoute: false,
    venue: '',
    distance: 0,
    speed: null,
    duration: null,
    bikeType: null,
    members: [],
    authorId: '1234'
  }

  @Input()
  public existWorkout: WorkoutModel | null = null

  constructor(private workoutNetworkService: WorkoutNetworkService,
              private workoutModelService: WorkoutModelService,
              private router: Router) {
    this.workoutSummary.subscribe()
    this.minDate = new Date()
  }

  private setExistWorkout(workout: WorkoutModel): void {
    const date = new Date(workout.date)

    this.dateFormGroup.get('date').patchValue(date)
    this.dateFormGroup.get('time').patchValue(new Intl.DateTimeFormat('ru-RU', {
      hour: 'numeric',
      minute: 'numeric'
    }).format(date))

    this.bikeTypeFormGroup.get('bikeType').patchValue(workout.bikeType)

    this.routeFormGroup.get('from').patchValue(workout.routePoints[ 0 ])
    this.routeFormGroup.get('to').patchValue(workout.routePoints[ 1 ])
    this.routeFormGroup.get('isCycledRoute').patchValue(!workout.oneWayRoute)

    this.venueFormGroup.get('place').patchValue(workout.venue)

    this.detailsFormGroup.get('distance').patchValue(workout.distance)
    this.detailsFormGroup.get('speed').patchValue(workout.speed)
    this.detailsFormGroup.get('duration').patchValue(workout.duration)
  }

  public ngOnInit(): void {
    if (this.existWorkout !== null) {
      this.setExistWorkout(this.existWorkout)
    } else {
      this.dateFormGroup.get('date').patchValue(new Date())
      this.dateFormGroup.get('time').patchValue('08:00')
      this.bikeTypeFormGroup.get('bikeType').patchValue(BikeType.any)
    }
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
    if (this.existWorkout === null) {
      this.workoutNetworkService.create(this.workout).subscribe({
        next: () => {
          this.workoutModelService.updateWorkouts()
          this.router.navigate([ '' ])
        }
      })
    } else {
      this.workoutNetworkService.update(this.existWorkout._id, this.workout).subscribe({
        next: () => {
          this.workoutModelService.updateWorkouts()
          this.router.navigate([ '' ])
        }
      })
    }
  }
}
