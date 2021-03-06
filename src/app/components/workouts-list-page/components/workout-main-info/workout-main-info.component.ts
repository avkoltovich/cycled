import { Component, Input, OnChanges } from '@angular/core'
import { WorkoutCard } from '../../models/models'
import { PowerZonesDialogComponent } from '../../dialogs/power-zones-dialog/power-zones-dialog.component'
import { MatDialog } from '@angular/material/dialog'
import { workoutFullTypeMap, workoutShortTypeMap, WorkoutType } from '../../../../helpers/constants'


@Component({
  selector: 'app-workout-main-info',
  templateUrl: './workout-main-info.component.html',
  styleUrls: [ './workout-main-info.component.scss' ]
})
export class WorkoutMainInfoComponent implements OnChanges {
  public isCardHidden: boolean
  public isSpeedHidden: boolean
  public isDurationHidden: boolean
  public workoutTypeCssClass: string
  public workoutShortType: string
  public workoutDateString: string
  public workoutFullType: string

  @Input()
  public workout: WorkoutCard | null

  @Input()
  public isOnlyTimeShow = true

  @Input()
  public isShowWorkoutType = true

  constructor(public dialog: MatDialog) {
  }

  public ngOnChanges(): void {
    if (typeof this.workout === 'undefined' || this.workout === null) {
      this.isCardHidden = true
    } else {
      if (typeof this.workout.workoutType === 'undefined' || this.workout.workoutType === null) {
        if (this.isNumberValueNotEmpty(this.workout.speed)) {
          this.workout = {
            ...this.workout,
            duration: this.isNumberValueNotEmpty(this.workout.duration)
              ? this.workout.duration
              : this.getWorkoutDurationBySpeed(this.workout.distance, this.workout.speed),
            workoutType: this.getWorkoutTypeShortBySpeed(this.workout.speed)
          }
        } else if (this.isNumberValueNotEmpty(this.workout.duration)) {
          const averageSpeed = this.getWorkoutAverageSpeed(this.workout.distance, this.workout.duration)

          this.workout = {
            ...this.workout,
            speed: averageSpeed,
            workoutType: this.getWorkoutTypeShortBySpeed(averageSpeed)
          }
        } else {
          this.workout = {
            ...this.workout,
            workoutType: WorkoutType.rc
          }
        }
      }

      this.isSpeedHidden = !this.isNumberValueNotEmpty(this.workout.speed)
      this.isDurationHidden = !this.isNumberValueNotEmpty(this.workout.duration)

      this.workoutTypeCssClass = `workout-card__type--${ this.workout.workoutType }`
      this.workoutShortType = this.getWorkoutShortType(this.workout.workoutType)
      this.workoutFullType = this.getWorkoutFullType(this.workout.workoutType)
      this.workoutDateString = this.getWorkoutDateString(this.workout.date)
    }
  }

  public getWorkoutShortType(type: string): string {
    return workoutShortTypeMap[ type ]
  }

  private getWorkoutTypeShortBySpeed(speed: number): string {
    if (speed <= 25) {
      return WorkoutType.rc
    } else if (speed <= 35) {
      return WorkoutType.ed
    } else if (speed <= 40) {
      return WorkoutType.tp
    } else {
      return WorkoutType.tr
    }
  }

  private getWorkoutAverageSpeed(distance: number, duration: number): number {
    return Math.floor(distance / (duration / 60))
  }

  private getWorkoutDurationBySpeed(distance: number, speed: number): number {
    return Math.floor(distance / (speed / 60))
  }

  private isNumberValueNotEmpty(value: number | undefined | null): boolean {
    return typeof value !== 'undefined' && value !== null && value !== 0
  }

  public getWorkoutFullType(type: string): string {
    return workoutFullTypeMap[ type ]
  }

  public getWorkoutDateString(dateISO: string): string {
    const date = new Date(dateISO)
    if (this.isOnlyTimeShow) {
      return new Intl.DateTimeFormat('ru-RU', { hour: 'numeric', minute: 'numeric' }).format(date)
    } else {
      return new Intl.DateTimeFormat('ru-RU', { month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }).format(date)
    }
  }

  public onPowerZoneBadgeClick(): void {
    this.dialog.open(PowerZonesDialogComponent)
  }
}
