import { Component, Input, OnInit } from '@angular/core'

const workoutTypeMap = {
  rc: 'R',
  ed: 'E',
  tp: 'T',
  tr: 'T',
  vo: 'V',
  an: 'A'
}

export interface WorkoutCard {
  workoutType: string
  date: string
  routePoints: string[]
  oneWayRoute: boolean
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

  public workoutTypeCssClass: string

  constructor() {
  }

  ngOnInit(): void {
    this.workoutTypeCssClass = `workout-card__type--${ this.workout.workoutType }`
  }

  public getWorkoutType(type: string): string {
    return workoutTypeMap[ type ]
  }

  public getWorkoutTime(dateISO: string): string {
    const date = new Date(dateISO)
    return new Intl.DateTimeFormat('ru-RU', { hour: 'numeric', minute: 'numeric' }).format(date)
  }

}
