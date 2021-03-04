import { Component, Input, OnChanges } from '@angular/core'
import { WorkoutCard } from '../../models/models'

@Component({
  selector: 'app-workout-main-info',
  templateUrl: './workout-main-info.component.html',
  styleUrls: [ './workout-main-info.component.scss' ]
})
export class WorkoutMainInfoComponent implements OnChanges {
  public isCardHidden: boolean
  public isSpeedHidden: boolean
  public isDurationHidden: boolean

  @Input()
  public workout: WorkoutCard | null

  constructor() {
  }

  public ngOnChanges(): void {
    if (typeof this.workout === 'undefined' || this.workout === null) {
      this.isCardHidden = true
    } else {
      this.isSpeedHidden = typeof this.workout.speed === 'undefined' || this.workout.speed === null
      this.isDurationHidden = typeof this.workout.duration === 'undefined' || this.workout.duration === null
    }
  }
}
