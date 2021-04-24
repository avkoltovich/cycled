import { Component } from '@angular/core'
import { map, tap } from 'rxjs/operators'
import { generateWorkoutCalendar, WorkoutModel } from '../../models/workout.model'
import { WorkoutModelService } from '../../services/workout-model.service'


@Component({
  selector: 'app-workout-list-page',
  templateUrl: './workout-list-page.component.html',
  styleUrls: [ './workout-list-page.component.scss' ],
})
export class WorkoutListPageComponent {
  public isLoading = true

  constructor(private workoutModelService: WorkoutModelService) {
  }

  public workoutCalendar = this.workoutModelService.workouts.pipe(
    map((workouts: WorkoutModel[]) => generateWorkoutCalendar(workouts)),
    tap(() => this.isLoading = false)
  )
}
