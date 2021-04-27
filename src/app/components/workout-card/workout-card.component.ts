import { Component, Input } from '@angular/core'
import { APP_URL, JWT_TOKEN } from 'src/shared/constants'
import { WorkoutModel } from '../../models/workout.model'
import { WorkoutNetworkService } from '../../services/workout-network.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { AuthService } from '../../services/auth.service'
import { Observable } from 'rxjs'
import { map, startWith } from 'rxjs/operators'

@Component({
  selector: 'app-workout-card',
  templateUrl: './workout-card.component.html',
  styleUrls: [ './workout-card.component.scss' ]
})
export class WorkoutCardComponent {
  public isAuthorized: Observable<boolean> = this.authService.isAuthorized.pipe(
    startWith(window.localStorage.getItem(JWT_TOKEN) !== null),
    map(() => window.localStorage.getItem(JWT_TOKEN) !== null)
  )

  @Input()
  public workout: WorkoutModel | null

  @Input()
  public isOnlyTimeShow = true

  constructor(private workoutNetworkService: WorkoutNetworkService,
              private authService: AuthService,
              private snackBar: MatSnackBar) {
  }

  public buildMemberCountString(count: number): string {
    if ((count >= 5 && count <= 19) || (count % 10 >= 5 && count % 10 <= 9) || count % 10 === 0) {
      return `${ count } участников`
    }

    return (count % 10 === 1) ? `${ count } участник` : `${ count } участника`
  }

  public onShareButtonClick(id: string): void {
    navigator.clipboard.writeText(`${ APP_URL }/workout/${ id }`).then(() => {
      this.snackBar.open('Ссылка на тренировку скопирована в буфер обмена', '', { duration: 3000, panelClass: 'cycled-snackbar' })
    })
  }

  public onDeleteButtonClick(id: string): void {
    this.workoutNetworkService.delete(id).subscribe({
      next: () => {
        this.snackBar.open('Тренировка успешно удалена', '', { duration: 3000, panelClass: 'cycled-snackbar' })
        this.workoutNetworkService.updateAll.next()
      }
    })
  }
}
