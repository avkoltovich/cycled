import { Component, OnInit } from '@angular/core';
import { WorkoutCardList } from './models/models';

const mockWorkoutCalendar: WorkoutCardList[] = [
  {
    date: '2021-03-07T07:42:09Z',
    workouts: [
      {
        workoutType: 'ed',
        date: '2021-08-28T05:15:09Z',
        routePoints: [ 'Тахтамукай', 'Калужская' ],
        oneWayRoute: false,
        distance: 60,
        speed: 25,
        bikeType: 'CX',
        members: []
      },
      {
        workoutType: 'tp',
        date: '2021-08-28T05:42:09Z',
        routePoints: [ 'Смоленская', 'Крепостная' ],
        oneWayRoute: false,
        distance: 50,
        speed: 20,
        bikeType: 'MTB',
        members: []
      },
      {
        workoutType: 'tr',
        date: '2021-08-28T06:00:09Z',
        routePoints: [ 'ДБ Екатерининский', 'Мачуги' ],
        oneWayRoute: true,
        distance: 50,
        speed: 25,
        bikeType: 'Шоссе',
        members: []
      },
      {
        workoutType: 'ed',
        date: '2021-08-28T05:42:09Z',
        routePoints: [ 'Смоленская', 'Крепостная' ],
        oneWayRoute: false,
        distance: 50,
        speed: 20,
        bikeType: 'CX',
        members: []
      },
      {
        workoutType: 'vo',
        date: '2021-08-28T07:30:09Z',
        routePoints: [ 'Пашковский Хлебзавод', 'Горячий Ключ' ],
        oneWayRoute: false,
        distance: 100,
        speed: 25,
        bikeType: 'Шоссе',
        members: []
      },
      {
        workoutType: 'rc',
        date: '2021-08-28T07:00:09Z',
        routePoints: [ 'Горячий Ключ', 'Кутаис', 'Горячий Ключ' ],
        oneWayRoute: false,
        distance: 50,
        speed: 30,
        bikeType: 'Шоссе',
        members: []
      },
      {
        workoutType: 'tr',
        date: '2021-08-28T06:00:09Z',
        routePoints: [ 'ДБ Екатерининский', 'Мачуги' ],
        oneWayRoute: true,
        distance: 50,
        speed: 25,
        bikeType: 'Шоссе',
        members: []
      },
    ]
  },
  {
    date: '2021-03-08T07:42:09Z',
    workouts: [
      {
        workoutType: 'an',
        date: '2021-08-28T05:15:09Z',
        routePoints: [ 'Тахтамукай', 'Калужская', 'Тахтамукай' ],
        oneWayRoute: false,
        distance: 60,
        speed: 25,
        bikeType: 'CX',
        members: []
      },
      {
        workoutType: 'tp',
        date: '2021-08-28T05:42:09Z',
        routePoints: [ 'Смоленская', 'Крепостная', 'Смоленская' ],
        oneWayRoute: false,
        distance: 50,
        speed: 20,
        bikeType: 'MTB',
        members: []
      },
      {
        workoutType: 'rc',
        date: '2021-08-28T07:00:09Z',
        routePoints: [ 'Горячий Ключ', 'Кутаис', 'Горячий Ключ' ],
        oneWayRoute: false,
        distance: 50,
        speed: 30,
        bikeType: 'Шоссе',
        members: []
      },
      {
        workoutType: 'ed',
        date: '2021-08-28T07:30:09Z',
        routePoints: [ 'Пашковский Хлебзавод', 'Горячий Ключ', 'Пашковский Хлебзавод' ],
        oneWayRoute: false,
        distance: 100,
        speed: 25,
        bikeType: 'Шоссе',
        members: []
      }
    ]
  },
  {
    date: '2021-03-09T07:42:09Z',
    workouts: [
      {
        workoutType: 'an',
        date: '2021-08-28T05:15:09Z',
        routePoints: [ 'Тахтамукай', 'Калужская' ],
        oneWayRoute: false,
        distance: 60,
        speed: 25,
        bikeType: 'CX',
        members: []
      },
      {
        workoutType: 'ed',
        date: '2021-08-28T05:42:09Z',
        routePoints: [ 'Смоленская', 'Крепостная' ],
        oneWayRoute: false,
        distance: 50,
        speed: 20,
        bikeType: 'MTB',
        members: []
      },
      {
        workoutType: 'tr',
        date: '2021-08-28T07:00:09Z',
        routePoints: [ 'Горячий Ключ', 'Кутаис' ],
        oneWayRoute: false,
        distance: 50,
        speed: 30,
        bikeType: 'Шоссе',
        members: []
      }
    ]
  }
]

@Component({
  selector: 'app-workout-list-page',
  templateUrl: './workout-list-page.component.html',
  styleUrls: [ './workout-list-page.component.scss' ],
})
export class WorkoutListPageComponent implements OnInit {

  public workoutCalendar: WorkoutCardList[] = mockWorkoutCalendar;

  constructor() {
  }

  ngOnInit(): void {
  }

}
