import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PowerZonesDialogComponent } from '../../dialogs/power-zones-dialog/power-zones-dialog.component';
import { WorkoutCard } from '../../models/models';

const workoutShortTypeMap = {
  rc: 'R',
  ed: 'E',
  tp: 'T',
  tr: 'T',
  vo: 'V',
  an: 'A'
};

const workoutFullTypeMap = {
  rc: 'Recovery',
  ed: 'Endurance',
  tp: 'Tempo',
  tr: 'Threshold',
  vo: 'VO2 Max',
  an: 'Anaerobic'
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

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.workoutTypeCssClass = `workout-card__type--${ this.workout.workoutType }`
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

