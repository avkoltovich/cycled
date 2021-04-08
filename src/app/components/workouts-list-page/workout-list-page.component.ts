import { Component, OnInit } from '@angular/core'
import { mockWorkoutCalendar } from '../../mocks/workout-list'
import { WorkoutCardList } from '../../models/workout.model'


@Component({
  selector: 'app-workout-list-page',
  templateUrl: './workout-list-page.component.html',
  styleUrls: [ './workout-list-page.component.scss' ],
})
export class WorkoutListPageComponent implements OnInit {

  public workoutCalendar: WorkoutCardList[] = mockWorkoutCalendar;

  constructor() {
  }

  ngOnInit(): void {
  }

}
