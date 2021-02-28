import { Component, Input, OnInit } from '@angular/core'
import { WorkoutCard } from '../workout-card/workout-card.component'

export interface WorkoutCardList {
  date: string
  workouts: WorkoutCard[]
}

interface WorkoutListDate {
  dayOfWeek: string,
  date: string
}

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

  ngOnInit(): void {
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
