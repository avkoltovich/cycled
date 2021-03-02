import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { WorkoutCard } from '../workouts-list-page/models/models';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-add-workout-page',
  templateUrl: './add-workout-page.component.html',
  styleUrls: [ './add-workout-page.component.scss' ]
})
export class AddWorkoutPageComponent implements OnInit {
  isLinear = true;
  public routeFormGroup: FormGroup;
  public bikeTypeFormGroup: FormGroup;
  public detailsFormGroup: FormGroup;
  /**
   * TODO Сделать проверку в компоненте с блоком информации по тренировке на отсутствие данных, чтобы не мокать ничего заранее
   */
  public workout: WorkoutCard = {
    workoutType: 'rc',
    date: new Date().toISOString(),
    routePoints: [ '' ],
    oneWayRoute: false,
    distance: 0,
    speed: 0,
    bikeType: 'Любой',
    members: [],
  };

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.routeFormGroup = this.formBuilder.group({
      from: [ null, Validators.required ],
      to: [ null, Validators.required ]
    });
    this.bikeTypeFormGroup = this.formBuilder.group({
      bikeType: [ 'any' ]
    });
    this.detailsFormGroup = this.formBuilder.group({
      speed: [ null, Validators.required ],
      distance: [ null, Validators.required ],
      duration: [ null ]
    });

    combineLatest([
      this.routeFormGroup.valueChanges,
      this.bikeTypeFormGroup.valueChanges,
      this.detailsFormGroup.valueChanges
    ]).pipe(
      tap(([ route, bikeType, details ]) => {
        this.workout = {
          workoutType: 'rc',
          date: new Date().toISOString(),
          routePoints: [ route.from, route.to ],
          oneWayRoute: false,
          distance: details.distance,
          speed: details.speed,
          bikeType,
          members: [],
        };
      })
    ).subscribe();
  }

  public onSubmit(): void {
  }
}
