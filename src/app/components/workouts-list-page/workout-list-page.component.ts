import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ISO8601 } from 'src/app/models/base.model';
import { WorkoutService } from 'src/app/services/workout.service';
import { generateWorkoutCalendar, WorkoutListByDay, WorkoutModel } from '../../models/workout.model';


@Component({
  selector: 'app-workout-list-page',
  templateUrl: './workout-list-page.component.html',
  styleUrls: ['./workout-list-page.component.scss'],
})
export class WorkoutListPageComponent implements OnInit {

  constructor(private workoutService: WorkoutService) {
  }

  public workoutCalendar = this.workoutService.getAll().pipe(
    map((workouts: WorkoutModel[]) => generateWorkoutCalendar(workouts))
  )

  ngOnInit(): void {
  }

}
