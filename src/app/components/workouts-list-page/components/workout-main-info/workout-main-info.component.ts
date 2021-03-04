import { Component, Input, OnChanges } from '@angular/core'
import { WorkoutCard } from '../../models/models'
import { PowerZonesDialogComponent } from '../../dialogs/power-zones-dialog/power-zones-dialog.component'
import { MatDialog } from '@angular/material/dialog'

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

  constructor(public dialog: MatDialog) {
  }

  public ngOnChanges(): void {
    if (typeof this.workout === 'undefined' || this.workout === null) {
      this.isCardHidden = true
    } else {
      this.isSpeedHidden = typeof this.workout.speed === 'undefined' || this.workout.speed === null
      this.isDurationHidden = typeof this.workout.duration === 'undefined' || this.workout.duration === null

      this.workoutTypeCssClass = `workout-card__type--${ this.workout.workoutType }`
    }
  }

  public getWorkoutShortType(type: string): string {
    return workoutShortTypeMap[ type ]
  }

  public getWorkoutFullType(type: string): string {
    return workoutFullTypeMap[ type ]
  }

  public getWorkoutTime(dateISO: string): string {
    const date = new Date(dateISO)
    return new Intl.DateTimeFormat('ru-RU', { hour: 'numeric', minute: 'numeric' }).format(date)
  }

  public onPowerZoneBadgeClick(): void {
    this.dialog.open(PowerZonesDialogComponent)
  }
}
