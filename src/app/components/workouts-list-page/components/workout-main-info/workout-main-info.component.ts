import { Component, Input, OnChanges } from '@angular/core'
import { WorkoutCard } from '../../models/models'
import { PowerZonesDialogComponent } from '../../dialogs/power-zones-dialog/power-zones-dialog.component'
import { MatDialog } from '@angular/material/dialog'

enum WorkoutType {
  rc = 'rc',
  ed = 'ed',
  tp = 'tp',
  tr = 'tr',
  vo = 'vo',
  an = 'an'
}

const workoutShortTypeMap = {
  rc: 'R',
  ed: 'E',
  tp: 'T',
  tr: 'T',
  vo: 'V',
  an: 'A'
}

const workoutFullTypeMap = {
  rc: 'Recovery',
  ed: 'Endurance',
  tp: 'Tempo',
  tr: 'Threshold',
  vo: 'VO2 Max',
  an: 'Anaerobic'
}

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
      const isSpeedValueNotEmpty = this.isNumberValueNotEmpty(this.workout.speed)

      const isDurationValueNotEmpty = this.isNumberValueNotEmpty(this.workout.duration)

      if (typeof this.workout.workoutType === 'undefined' || this.workout.workoutType === null) {
        if (isSpeedValueNotEmpty) {
          this.workout = {
            ...this.workout,
            duration: isDurationValueNotEmpty
              ? this.workout.duration
              : this.getWorkoutDurationBySpeed(this.workout.distance, this.workout.speed),
            workoutType: this.getWorkoutTypeShortBySpeed(this.workout.speed)
          }
        } else if (isDurationValueNotEmpty) {
          const averageSpeed = this.getWorkoutAveregeSpeed(this.workout.distance, this.workout.duration)

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

      this.isSpeedHidden = !isSpeedValueNotEmpty
      this.isDurationHidden = !isDurationValueNotEmpty

      this.workoutTypeCssClass = `workout-card__type--${ this.workout.workoutType }`
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

  private getWorkoutAveregeSpeed(distance: number, duration: number): number {
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

  public getWorkoutTime(dateISO: string): string {
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
