import { Component, Input, OnInit } from '@angular/core'
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms'
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


export const routePointsValidator = (routePoints: string[]): ValidatorFn => {
  return (control: AbstractControl): { [ key: string ]: any } | null => {
    const isEmpty = routePoints.length === 0
    return isEmpty ? { routePoints: { value: control.value } } : null
  }
}

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
  private currentStepElement: HTMLElement | null = null
  public isLoading = false
  public minDate: Date
  public bikeTypeMap = bikeTypeMap
  public bikeTypes = Object.keys(this.bikeTypeMap)
  public routePoints: string[] = []

  public dateFormGroup = new FormGroup({
    date: new FormControl(null, Validators.required),
    time: new FormControl(null, Validators.required)
  })

  public routeFormGroup = new FormGroup({
    point: new FormControl(null, routePointsValidator(this.routePoints))
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

  public commentFormGroup = new FormGroup({
    comment: new FormControl(null)
  })

  public workoutSummary = combineLatest([
    this.dateFormGroup.valueChanges,
    this.venueFormGroup.valueChanges,
    this.bikeTypeFormGroup.valueChanges,
    this.detailsFormGroup.valueChanges,
    this.commentFormGroup.valueChanges
  ]).pipe(
    tap(([ dateForm, venueForm, typeForm, detailsForm, commentForm ]) => {
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
        routePoints: this.routePoints,
        oneWayRoute: false,
        venue: venueForm.place,
        distance: detailsForm.distance,
        speed: detailsForm.speed,
        duration: detailsForm.duration,
        bikeType: typeForm.bikeType,
        members: this.workout.members,
        comment: commentForm.comment
      }

      console.log(this.workout)
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
    authorId: window.localStorage.getItem(USER_ID),
    comment: null
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
    this.routePoints = workout.routePoints

    /**
     * Хак, чтобы подменить контекст для функции валидатора
     */
    this.routeFormGroup.get('point').setValidators(routePointsValidator(this.routePoints))

    this.dateFormGroup.get('date').patchValue(date)
    this.dateFormGroup.get('time').patchValue(new Intl.DateTimeFormat('ru-RU', {
      hour: 'numeric',
      minute: 'numeric'
    }).format(date))
    this.bikeTypeFormGroup.get('bikeType').patchValue(workout.bikeType)
    this.venueFormGroup.get('place').patchValue(workout.venue)
    this.detailsFormGroup.get('distance').patchValue(workout.distance)
    this.detailsFormGroup.get('speed').patchValue(workout.speed)
    this.detailsFormGroup.get('duration').patchValue(workout.duration)
    this.workout.members = workout.members

    if (typeof workout.comment === 'undefined') {
      /**
       * Временная мера, чтобы обновить комментарии во всех тренировках
       */
      this.workout.comment = null
    } else {
      this.commentFormGroup.get('comment').patchValue(workout.comment)
    }
  }

  public ngOnInit(): void {
    if (this.existWorkout !== null) {
      this.setExistWorkout(this.existWorkout)
    } else {
      this.dateFormGroup.get('date').patchValue(new Date())
      this.dateFormGroup.get('time').patchValue('08:00')
      this.bikeTypeFormGroup.get('bikeType').patchValue(BikeType.any)
      this.commentFormGroup.get('comment').patchValue(null)
    }
  }

  public checkWorkoutRoute(): boolean {
    return this.routePoints.length !== 0
  }

  public onAddRoutePoint(): void {
    const pointValue = this.routeFormGroup.get('point').value

    if (pointValue !== null && pointValue !== '') {
      this.routePoints.push(pointValue)
      this.routeFormGroup.get('point').patchValue('')
    }
  }

  public onRemoveRoutePoint(routePoint: string): void {
    const index = this.routePoints.findIndex((point) => routePoint === point)
    this.routePoints.splice(index, 1)

    this.routeFormGroup.get('point').patchValue(this.routeFormGroup.get('point').value)
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
