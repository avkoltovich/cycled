import { Component, Input } from '@angular/core'
import { APP_URL } from 'src/shared/constants'
import { WorkoutModel } from '../../../../models/workout.model'

@Component({
  selector: 'app-workout-card',
  templateUrl: './workout-card.component.html',
  styleUrls: ['./workout-card.component.scss']
})
export class WorkoutCardComponent {
  @Input()
  public workout: WorkoutModel | null

  @Input()
  public isOnlyTimeShow = true

  public buildMemberCountString(count: number): string {
    if ((count >= 5 && count <= 19) || (count % 10 >= 5 && count % 10 <= 9) || count % 10 === 0) {
      return `${count} участников`
    }

    return (count % 10 === 1) ? `${count} участник` : `${count} участника`
  }

  public onShareButtonClick(id: string): void {
    window.open(`${APP_URL}/workout/${id}`, '_blank')
  }
}
