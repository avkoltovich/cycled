import { Component, OnInit } from '@angular/core'
import { WorkoutCardList } from '../workout-card-list/workout-card-list.component'

const mockWorkoutCalendar: WorkoutCardList[] = [
  {
    date: '2021-08-28T07:42:09Z',
    workouts: [
      {
        workoutType: 'rc',
        date: '2021-08-28T07:00:09Z',
        routeFrom: 'Горячий Ключ',
        routeTo: 'Кутаис',
        distance: 50,
        speed: 30,
        bikeType: 'Шоссе',
      },
      {
        workoutType: 'ed',
        date: '2021-08-28T05:15:09Z',
        routeFrom: 'Катюша',
        routeTo: 'Кореновск',
        distance: 100,
        speed: 30,
        bikeType: 'Шоссе',
      },
      {
        workoutType: 'tp',
        date: '2021-08-28T05:42:09Z',
        routeFrom: 'Яблоновский',
        routeTo: 'Шенджий',
        distance: 100,
        speed: 30,
        bikeType: 'Шоссе',
      },
      {
        workoutType: 'tr',
        date: '2021-08-28T06:00:09Z',
        routeFrom: 'ДБ Екатерининский',
        routeTo: 'Мачуги',
        distance: 50,
        speed: 25,
        bikeType: 'Шоссе',
      },
      {
        workoutType: 'vo',
        date: '2021-08-28T07:30:09Z',
        routeFrom: 'Пашковский Хлебзавод',
        routeTo: 'Горячий Ключ',
        distance: 50,
        speed: 25,
        bikeType: 'Шоссе',
      }
    ]
  }
]

@Component({
  selector: 'app-workout-calendar',
  templateUrl: './workout-calendar.component.html',
  styleUrls: ['./workout-calendar.component.scss']
})
export class WorkoutCalendarComponent implements OnInit {

  public workoutCalendar: WorkoutCardList[] = mockWorkoutCalendar

  constructor() { }

  ngOnInit(): void {
  }

}
