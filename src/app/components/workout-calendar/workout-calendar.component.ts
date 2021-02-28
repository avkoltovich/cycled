import { Component, OnInit } from '@angular/core'
import { WorkoutCardList } from '../workout-card-list/workout-card-list.component'

const mockWorkoutCalendar: WorkoutCardList[] = [
  {
    date: '2021-03-07T07:42:09Z',
    workouts: [
      {
        workoutType: 'rc',
        date: '2021-08-28T07:00:09Z',
        routePoints: [ 'Горячий Ключ', 'Кутаис', 'Горячий Ключ' ],
        oneWayRoute: false,
        distance: 50,
        speed: 30,
        bikeType: 'Шоссе',
      },
      {
        workoutType: 'ed',
        date: '2021-08-28T05:15:09Z',
        routePoints: [ 'Тахтамукай', 'Калужская' ],
        oneWayRoute: false,
        distance: 60,
        speed: 25,
        bikeType: 'CX',
      },
      {
        workoutType: 'tp',
        date: '2021-08-28T05:42:09Z',
        routePoints: [ 'Смоленская', 'Крепостная' ],
        oneWayRoute: false,
        distance: 50,
        speed: 20,
        bikeType: 'MTB',
      },
      {
        workoutType: 'tr',
        date: '2021-08-28T06:00:09Z',
        routePoints: [ 'ДБ Екатерининский', 'Мачуги' ],
        oneWayRoute: true,
        distance: 50,
        speed: 25,
        bikeType: 'Шоссе',
      },
      {
        workoutType: 'vo',
        date: '2021-08-28T07:30:09Z',
        routePoints: [ 'Пашковский Хлебзавод', 'Горячий Ключ', 'Пашковский Хлебзавод' ],
        oneWayRoute: false,
        distance: 100,
        speed: 25,
        bikeType: 'Шоссе',
      }
    ]
  },
  {
    date: '2021-03-08T07:42:09Z',
    workouts: [
      {
        workoutType: 'an',
        date: '2021-08-28T05:15:09Z',
        routePoints: [ 'Тахтамукай', 'Калужская' ],
        oneWayRoute: false,
        distance: 60,
        speed: 25,
        bikeType: 'CX',
      },
      {
        workoutType: 'tp',
        date: '2021-08-28T05:42:09Z',
        routePoints: [ 'Смоленская', 'Крепостная' ],
        oneWayRoute: false,
        distance: 50,
        speed: 20,
        bikeType: 'MTB',
      },
      {
        workoutType: 'tr',
        date: '2021-08-28T06:00:09Z',
        routePoints: [ 'ДБ Екатерининский', 'Мачуги' ],
        oneWayRoute: true,
        distance: 50,
        speed: 25,
        bikeType: 'Шоссе',
      },
      {
        workoutType: 'vo',
        date: '2021-08-28T07:30:09Z',
        routePoints: [ 'Пашковский Хлебзавод', 'Горячий Ключ', 'Пашковский Хлебзавод' ],
        oneWayRoute: false,
        distance: 100,
        speed: 25,
        bikeType: 'Шоссе',
      }
    ]
  }
]

@Component({
  selector: 'app-workout-calendar',
  templateUrl: './workout-calendar.component.html',
  styleUrls: [ './workout-calendar.component.scss' ],
})
export class WorkoutCalendarComponent implements OnInit {

  public workoutCalendar: WorkoutCardList[] = mockWorkoutCalendar

  constructor() { }

  ngOnInit(): void {
  }

}
