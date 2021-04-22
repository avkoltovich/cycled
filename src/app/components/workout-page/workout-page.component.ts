import { Component } from '@angular/core'
import { generateWorkoutCalendar, WorkoutListByDay, WorkoutModel } from '../../models/workout.model'
import { ActivatedRoute, ParamMap } from '@angular/router'
import { map, switchMap } from 'rxjs/operators'
import { WorkoutNetworkService } from '../../services/workout-network.service'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-workout-page',
  templateUrl: './workout-page.component.html',
  styleUrls: [ './workout-page.component.scss' ]
})
export class WorkoutPageComponent {

  public workoutList: Observable<WorkoutListByDay> = this.activatedRoute.paramMap.pipe(
          map((paramMap: ParamMap) => paramMap.get('id')),
          switchMap((id: string) => this.workoutNetworkService.getById(id)),
          map((workouts: WorkoutModel[]) => {
            const [ workoutListByDate ] = generateWorkoutCalendar(workouts)

            return workoutListByDate
          })
  )

  constructor(private activatedRoute: ActivatedRoute,
              private workoutNetworkService: WorkoutNetworkService) {
  }
}
