import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { tap } from 'rxjs/operators'
import { WorkoutCard } from '../workouts-list-page/models/models'
import { combineLatest } from 'rxjs'

const bikeTypeMap = {
  any: 'Любой',
  road: 'Шоссе',
  cx: 'CX',
  mtb: 'MTB'
}

@Component({
  selector: 'app-add-workout-page',
  templateUrl: './add-workout-page.component.html',
  styleUrls: [ './add-workout-page.component.scss' ]
})
export class AddWorkoutPageComponent implements OnInit {
  public isLinear = true
  public routeFormGroup: FormGroup = this.formBuilder.group({
    from: [ null, Validators.required ],
    to: [ null, Validators.required ],
    isCycledRoute: [ false ]
  })

  public bikeTypeFormGroup: FormGroup = this.formBuilder.group({
    bikeType: [ null, Validators.required ]
  })

  public detailsFormGroup: FormGroup = this.formBuilder.group({
    speed: [ null, Validators.required ],
    distance: [ null, Validators.required ],
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
        bikeType: bikeTypeMap[ type.bikeType ],
        members: [],
      }
    })
  )
  /**
   * TODO Сделать проверку в компоненте с блоком информации по тренировке на отсутствие данных, чтобы не мокать ничего заранее
   */
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

  constructor(private formBuilder: FormBuilder) {
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
