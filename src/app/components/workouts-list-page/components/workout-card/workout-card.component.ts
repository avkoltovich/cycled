import { Component, Input } from '@angular/core'
import { WorkoutCard } from '../../../../models/workout.model'

@Component({
  selector: 'app-workout-card',
  templateUrl: './workout-card.component.html',
  styleUrls: [ './workout-card.component.scss' ]
})
export class WorkoutCardComponent {

  @Input()
  public workout: WorkoutCard

  @Input()
  public isOnlyTimeShow = true
}

