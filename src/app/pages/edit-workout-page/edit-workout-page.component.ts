import { Component } from '@angular/core'
import { WorkoutNetworkService } from '../../services/workout-network.service'
import { WorkoutModel } from '../../models/workout.model'
import { ActivatedRoute, ParamMap } from '@angular/router'
import { map, switchMap, take, tap } from 'rxjs/operators'

@Component({
  selector: 'app-edit-workout-page',
  templateUrl: './edit-workout-page.component.html',
  styleUrls: [ './edit-workout-page.component.scss' ]
})
export class EditWorkoutPageComponent {
  public workout = null

  constructor(private activatedRoute: ActivatedRoute,
              private workoutNetworkService: WorkoutNetworkService) {
    this.activatedRoute.paramMap.pipe(
      take(1),
      map((paramMap: ParamMap) => paramMap.get('id')),
      switchMap((id: string) => this.workoutNetworkService.getById(id)),
      tap((workout: WorkoutModel) => this.workout = workout)
    ).subscribe()
  }
}
