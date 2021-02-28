import { Component, Input, OnInit } from '@angular/core'
import { WorkoutCard } from '../workout-card/workout-card.component'

export interface WorkoutCardList {
  date: string
  workouts: WorkoutCard[]
}

@Component({
  selector: 'app-workout-card-list',
  templateUrl: './workout-card-list.component.html',
  styleUrls: [ './workout-card-list.component.scss' ]
})
export class WorkoutCardListComponent implements OnInit {

  @Input()
  public workoutList: WorkoutCardList

  constructor() {
  }

  ngOnInit(): void {
  }

}
