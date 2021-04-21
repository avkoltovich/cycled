import { Component, Input, ViewEncapsulation } from '@angular/core'
import { WorkoutListByDay } from '../../../../models/workout.model'

@Component({
  selector: 'app-workout-card-list',
  templateUrl: './workout-card-list.component.html',
  styleUrls: ['./workout-card-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WorkoutCardListComponent {

  @Input()
  public workoutList: WorkoutListByDay | null = null

  constructor() {
  }

  public getWorkoutListDate(dateISO: string): string {
    const date = new Date(dateISO)

    return new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long' }).format(date)
  }
}
