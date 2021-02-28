import { Component, Input, OnInit } from '@angular/core'

const workoutTypeMap = {
  rc: 'R',
  ed: 'E',
  tp: 'T',
  tr: 'T'
}

export interface WorkoutCard {
  workoutType: string
  date: string
  routeFrom: string
  routeTo: string
  distance: number
  speed: number
  bikeType: string
}

@Component({
  selector: 'app-workout-card',
  templateUrl: './workout-card.component.html',
  styleUrls: [ './workout-card.component.scss' ]
})
export class WorkoutCardComponent implements OnInit {

  @Input()
  public workout: WorkoutCard

  public workoutType: string

  constructor() {
  }

  ngOnInit(): void {
    this.workoutType = `workout-card__type--${ this.workout.workoutType }`
  }

  public getWorkoutType(type: string): string {
    return workoutTypeMap[ type ]
  }

}
