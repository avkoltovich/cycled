import { Injectable } from '@angular/core'
import { WorkoutNetworkService } from './workout-network.service'
import { BehaviorSubject } from 'rxjs'
import { take } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class WorkoutModelService {
  public workouts = new BehaviorSubject([])

  constructor(private workoutNetworkService: WorkoutNetworkService) {
    this.workoutNetworkService.getAll().pipe(
            take(1)
    ).subscribe((workouts) => this.workouts.next(workouts))
  }

  public updateWorkouts(): void {
    this.workoutNetworkService.getAll().pipe(
            take(1)
    ).subscribe((workouts) => this.workouts.next(workouts))
  }
}
