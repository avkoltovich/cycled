import { Component, Input, OnInit } from '@angular/core'
import { WorkoutCardList, WorkoutListDate } from '../../../../models/workout.model'

@Component({
  selector: 'app-workout-card-list',
  templateUrl: './workout-card-list.component.html',
  styleUrls: [ './workout-card-list.component.scss' ]
})
export class WorkoutCardListComponent implements OnInit {

  @Input()
  public workoutList: WorkoutCardList

  public workoutListDate: WorkoutListDate

  constructor() {
  }

  public ngOnInit(): void {
    this.workoutListDate = this.getWorkoutListDate(this.workoutList.date)
  }

  public getWorkoutListDate(dateISO: string): WorkoutListDate {
    const date = new Date(dateISO)

    return {
      dayOfWeek: new Intl.DateTimeFormat('ru-RU', { weekday: 'long' }).format(date),
      date: new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long' }).format(date)
    }
  }
}
