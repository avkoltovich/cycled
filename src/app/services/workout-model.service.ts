import { Injectable } from '@angular/core'
import { WorkoutNetworkService } from './workout-network.service'
import { combineLatest, Subject } from 'rxjs'
import { map, startWith } from 'rxjs/operators'
import { WorkoutModel } from '../models/workout.model'

@Injectable({
  providedIn: 'root'
})
export class WorkoutModelService {
  public update = new Subject()

  public workouts = combineLatest([
    this.workoutNetworkService.getAll(),
    this.update.pipe(
      startWith(null)
    )
  ]).pipe(
    map(([ workouts ]: [ WorkoutModel[], void ]) => workouts)
  )

  constructor(private workoutNetworkService: WorkoutNetworkService) {
  }
}
