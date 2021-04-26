import { Component } from '@angular/core'
import { map, startWith, switchMap, tap } from 'rxjs/operators'
import { generateWorkoutCalendar, WorkoutModel } from '../../models/workout.model'
import { WorkoutNetworkService } from '../../services/workout-network.service'


@Component({
  selector: 'app-workout-list-page',
  templateUrl: './workout-list-page.component.html',
  styleUrls: [ './workout-list-page.component.scss' ],
})
export class WorkoutListPageComponent {
  public isLoading = true

  constructor(private workoutNetworkService: WorkoutNetworkService) {
  }

  public workoutCalendar = this.workoutNetworkService.updateAll.pipe(
    startWith(null),
    switchMap(() => this.workoutNetworkService.getAll().pipe(
      map((workouts: WorkoutModel[]) => generateWorkoutCalendar(workouts)),
      tap(() => this.isLoading = false)
    ))
  )
}
