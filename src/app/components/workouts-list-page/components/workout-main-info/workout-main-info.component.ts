import { Component, Input, OnInit } from '@angular/core';
import { WorkoutCard } from '../../models/models';

@Component({
  selector: 'app-workout-main-info',
  templateUrl: './workout-main-info.component.html',
  styleUrls: [ './workout-main-info.component.scss' ]
})
export class WorkoutMainInfoComponent implements OnInit {

  @Input()
  public workout: WorkoutCard;

  constructor() {
  }

  ngOnInit(): void {
  }

}
