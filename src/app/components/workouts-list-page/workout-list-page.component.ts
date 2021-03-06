import { Component, OnInit } from '@angular/core'
import { WorkoutCardList } from './models/models'
import { mockWorkoutCalendar } from '../../mocks/workout-list'


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
