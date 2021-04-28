import { Component } from '@angular/core'
import { map, startWith, switchMap, tap } from 'rxjs/operators'
import { generateWorkoutCalendar, WorkoutModel } from '../../models/workout.model'
import { WorkoutNetworkService } from '../../services/workout-network.service'
import { Observable } from 'rxjs'
import { JWT_TOKEN } from '../../../shared/constants'
import { AuthService } from '../../services/auth.service'


@Component({
  selector: 'app-workout-list-page',
  templateUrl: './workout-list-page.component.html',
  styleUrls: [ './workout-list-page.component.scss' ],
})
export class WorkoutListPageComponent {
  public isLoading = true

  public isAuthorized: Observable<boolean> = this.authService.isAuthorized.pipe(
    startWith(window.localStorage.getItem(JWT_TOKEN) !== null),
    map(() => window.localStorage.getItem(JWT_TOKEN) !== null)
  )

  constructor(private workoutNetworkService: WorkoutNetworkService,
              private authService: AuthService) {
  }

  public workoutCalendar = this.workoutNetworkService.updateAll.pipe(
    startWith(null),
    switchMap(() => this.workoutNetworkService.getAll().pipe(
      map((workouts: WorkoutModel[]) => generateWorkoutCalendar(workouts)),
      tap(() => this.isLoading = false)
    ))
  )
}
