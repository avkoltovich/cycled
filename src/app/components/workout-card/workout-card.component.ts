import { Component, Input, OnChanges } from '@angular/core'
import { APP_URL, JWT_TOKEN, USER_ID } from 'src/shared/constants'
import { WorkoutModel } from '../../models/workout.model'
import { WorkoutNetworkService } from '../../services/workout-network.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { AuthService } from '../../services/auth.service'
import { EMPTY, Observable } from 'rxjs'
import { catchError, map, startWith, tap } from 'rxjs/operators'
import { HttpErrorResponse } from '@angular/common/http'

@Component({
  selector: 'app-workout-card',
  templateUrl: './workout-card.component.html',
  styleUrls: [ './workout-card.component.scss' ]
})
export class WorkoutCardComponent implements OnChanges {
  @Input()
  public workout: WorkoutModel | null

  @Input()
  public isOnlyTimeShow = true

  public isMyWorkout: Observable<boolean> = this.authService.isAuthorized.pipe(
    startWith(window.localStorage.getItem(JWT_TOKEN) !== null),
    map(() => window.localStorage.getItem(JWT_TOKEN) !== null && window.localStorage.getItem(USER_ID) === this.workout.authorId)
  )

  public isAuthorized: Observable<boolean> = this.authService.isAuthorized.pipe(
    startWith(window.localStorage.getItem(JWT_TOKEN) !== null),
    map(() => window.localStorage.getItem(JWT_TOKEN) !== null)
  )

  public isCurrentlyJoinedToWorkout = false

  constructor(private workoutNetworkService: WorkoutNetworkService,
              private authService: AuthService,
              private snackBar: MatSnackBar) {
  }

  public ngOnChanges(): void {
    this.isCurrentlyJoinedToWorkout = this.workout.members.includes(window.localStorage.getItem(USER_ID))
  }

  public buildMemberCountString(count: number): string {
    if ((count >= 5 && count <= 19) || (count % 10 >= 5 && count % 10 <= 9) || count % 10 === 0) {
      return `${ count } участников`
    }

    return (count % 10 === 1) ? `${ count } участник` : `${ count } участника`
  }

  public onJoinButtonClick(workout: WorkoutModel): void {
    const userId = window.localStorage.getItem(USER_ID)

    if (workout.members.includes(userId)) {
      this.workoutNetworkService.unjoinWorkout(workout).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.authService.logout()

            this.snackBar.open('Ошибка авторизации', '', { duration: 3000, panelClass: 'cycled-snackbar' })
          }

          return EMPTY
        }),
        tap(() => {
          this.snackBar.open('Заявка на участие отменена', '', { duration: 3000, panelClass: 'cycled-snackbar' })
          this.workoutNetworkService.updateAll.next()
        })
      ).subscribe()
    } else {
      this.workoutNetworkService.joinToWorkout(workout).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.authService.logout()

            this.snackBar.open('Ошибка авторизации', '', { duration: 3000, panelClass: 'cycled-snackbar' })
          }

          return EMPTY
        }),
        tap(() => {
          this.snackBar.open('Заявка на участие принята', '', { duration: 3000, panelClass: 'cycled-snackbar' })
          this.workoutNetworkService.updateAll.next()
        })
      ).subscribe()
    }
  }

  public onShareButtonClick(id: string): void {
    navigator.clipboard.writeText(`${ APP_URL }/workout/${ id }`).then(() => {
      this.snackBar.open('Ссылка на тренировку скопирована в буфер обмена', '', { duration: 3000, panelClass: 'cycled-snackbar' })
    })
  }

  public onDeleteButtonClick(id: string): void {
    this.workoutNetworkService.delete(id).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.authService.logout()

          this.snackBar.open('Ошибка авторизации', '', { duration: 3000, panelClass: 'cycled-snackbar' })
        }

        return EMPTY
      }),
      tap(() => {
        this.snackBar.open('Тренировка успешно удалена', '', { duration: 3000, panelClass: 'cycled-snackbar' })
        this.workoutNetworkService.updateAll.next()
      })
    ).subscribe()
  }
}
