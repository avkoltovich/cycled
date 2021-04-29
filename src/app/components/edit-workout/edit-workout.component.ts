import { Component, Input, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { catchError, tap } from 'rxjs/operators'
import { combineLatest, EMPTY } from 'rxjs'
import { STEPPER_GLOBAL_OPTIONS, StepperSelectionEvent } from '@angular/cdk/stepper'
import { ISO8601 } from '../../models/base.model'
import { BikeType, bikeTypeMap, WorkoutModel } from 'src/app/models/workout.model'
import { WorkoutNetworkService } from '../../services/workout-network.service'
import { Router } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar'
import { USER_ID } from '../../../shared/constants'
import { HttpErrorResponse } from '@angular/common/http'
import { AuthService } from '../../services/auth.service'


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
  public isLoading = false
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
        members: this.workout.members,
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
    members: [ window.localStorage.getItem(USER_ID) ],
    authorId: window.localStorage.getItem(USER_ID)
  }

  @Input()
  public existWorkout: WorkoutModel | null = null

  @Input()
  public isLinear = true

  constructor(private workoutNetworkService: WorkoutNetworkService,
              private snackBar: MatSnackBar,
              private authService: AuthService,
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
    this.workout.members = workout.members
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

  public onSaveButtonClick(): void {
    if (this.existWorkout === null) {
      this.isLoading = true
      this.workoutNetworkService.create(this.workout).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.authService.logout()

            this.snackBar.open('Ошибка авторизации', '', { duration: 3000, panelClass: 'cycled-snackbar' })
          }

          return EMPTY
        }),
        tap(() => {
          this.isLoading = false
          this.snackBar.open('Тренировка успешно добавлена', '', { duration: 3000, panelClass: 'cycled-snackbar' })
          this.workoutNetworkService.updateAll.next()
          this.router.navigate([ '' ])
        })
      ).subscribe()
    } else {
      this.isLoading = true
      this.workoutNetworkService.update(this.existWorkout._id, this.workout).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.authService.logout()

            this.snackBar.open('Ошибка авторизации', '', { duration: 3000, panelClass: 'cycled-snackbar' })
          }

          return EMPTY
        }),
        tap(() => {
          this.isLoading = false
          this.snackBar.open('Тренировка успешно обновлена', '', { duration: 3000, panelClass: 'cycled-snackbar' })
          this.workoutNetworkService.updateAll.next()
          this.router.navigate([ '' ])
        })
      ).subscribe()
    }
  }
}
