import { ISO8601 } from '../models/base.model'
import { BikeType, WorkoutCardList, WorkoutType } from '../models/workout.model'

export const mockWorkoutCalendar: WorkoutCardList[] = [
  {
    date: '2021-03-07T07:42:09Z',
    workouts: [
      {
        workoutType: WorkoutType.ed,
        date: '2021-08-28T05:15:09Z' as ISO8601,
        routePoints: [ 'Тахтамукай', 'Калужская' ],
        oneWayRoute: false,
        venue: 'Напротив хлебзавода',
        distance: 60,
        speed: 25,
        bikeType: BikeType.cx,
        members: [
          {
            id: '1',
            login: 'login',
            email: 'mail@mail.ru',
            name: 'Илья',
            lastAuthTime: '2021-08-28T05:42:09Z' as ISO8601
          },
          {
            id: '1',
            login: 'login',
            email: 'mail@mail.ru',
            name: 'Василий',
            lastAuthTime: '2021-08-28T05:42:09Z' as ISO8601
          },
          {
            id: '1',
            login: 'login',
            email: 'mail@mail.ru',
            name: 'Олег',
            lastAuthTime: '2021-08-28T05:42:09Z' as ISO8601
          },
          {
            id: '1',
            login: 'login',
            email: 'mail@mail.ru',
            name: 'Пётр',
            lastAuthTime: '2021-08-28T05:42:09Z' as ISO8601
          }
        ]
      },
      {
        workoutType: WorkoutType.tp,
        date: '2021-08-28T05:42:09Z' as ISO8601,
        routePoints: [ 'Смоленская', 'Крепостная' ],
        oneWayRoute: false,
        venue: 'На Марсе',
        distance: 50,
        speed: 20,
        bikeType: BikeType.mtb,
        members: [
          {
            id: '1',
            login: 'login',
            email: 'mail@mail.ru',
            name: 'Илья',
            lastAuthTime: '2021-08-28T05:42:09Z' as ISO8601
          },
          {
            id: '1',
            login: 'login',
            email: 'mail@mail.ru',
            name: 'Василий',
            lastAuthTime: '2021-08-28T05:42:09Z' as ISO8601
          },
          {
            id: '1',
            login: 'login',
            email: 'mail@mail.ru',
            name: 'Олег',
            lastAuthTime: '2021-08-28T05:42:09Z' as ISO8601
          },
          {
            id: '1',
            login: 'login',
            email: 'mail@mail.ru',
            name: 'Пётр',
            lastAuthTime: '2021-08-28T05:42:09Z' as ISO8601
          }
        ]
      },
      {
        workoutType: WorkoutType.tr,
        date: '2021-08-28T06:00:09Z' as ISO8601,
        routePoints: [ 'ДБ Екатерининский', 'Мачуги' ],
        oneWayRoute: true,
        venue: 'Напротив дворца бракосочетания',
        distance: 50,
        speed: 25,
        bikeType: BikeType.road,
        members: [
          {
            id: '1',
            login: 'login',
            email: 'mail@mail.ru',
            name: 'Илья',
            lastAuthTime: '2021-08-28T05:42:09Z' as ISO8601
          },
          {
            id: '1',
            login: 'login',
            email: 'mail@mail.ru',
            name: 'Василий',
            lastAuthTime: '2021-08-28T05:42:09Z' as ISO8601
          },
          {
            id: '1',
            login: 'login',
            email: 'mail@mail.ru',
            name: 'Олег',
            lastAuthTime: '2021-08-28T05:42:09Z' as ISO8601
          },
          {
            id: '1',
            login: 'login',
            email: 'mail@mail.ru',
            name: 'Пётр',
            lastAuthTime: '2021-08-28T05:42:09Z' as ISO8601
          }
        ]
      },
      {
        workoutType: WorkoutType.ed,
        date: '2021-08-28T05:42:09Z' as ISO8601,
        routePoints: [ 'Смоленская', 'Крепостная' ],
        oneWayRoute: false,
        venue: 'Где-то там',
        distance: 50,
        speed: 20,
        bikeType: BikeType.cx,
        members: [
          {
            id: '1',
            login: 'login',
            email: 'mail@mail.ru',
            name: 'Илья',
            lastAuthTime: '2021-08-28T05:42:09Z' as ISO8601
          },
          {
            id: '1',
            login: 'login',
            email: 'mail@mail.ru',
            name: 'Василий',
            lastAuthTime: '2021-08-28T05:42:09Z' as ISO8601
          },
          {
            id: '1',
            login: 'login',
            email: 'mail@mail.ru',
            name: 'Олег',
            lastAuthTime: '2021-08-28T05:42:09Z' as ISO8601
          },
          {
            id: '1',
            login: 'login',
            email: 'mail@mail.ru',
            name: 'Пётр',
            lastAuthTime: '2021-08-28T05:42:09Z' as ISO8601
          }
        ]
      },
      {
        workoutType: WorkoutType.vo,
        date: '2021-08-28T07:30:09Z' as ISO8601,
        routePoints: [ 'Пашковский Хлебзавод', 'Горячий Ключ' ],
        oneWayRoute: false,
        venue: 'Вот там вот',
        distance: 100,
        speed: 25,
        bikeType: BikeType.road,
        members: [
          {
            id: '1',
            login: 'login',
            email: 'mail@mail.ru',
            name: 'Илья',
            lastAuthTime: '2021-08-28T05:42:09Z' as ISO8601
          },
          {
            id: '1',
            login: 'login',
            email: 'mail@mail.ru',
            name: 'Василий',
            lastAuthTime: '2021-08-28T05:42:09Z' as ISO8601
          },
          {
            id: '1',
            login: 'login',
            email: 'mail@mail.ru',
            name: 'Олег',
            lastAuthTime: '2021-08-28T05:42:09Z' as ISO8601
          },
          {
            id: '1',
            login: 'login',
            email: 'mail@mail.ru',
            name: 'Пётр',
            lastAuthTime: '2021-08-28T05:42:09Z' as ISO8601
          }
        ]
      },
      {
        workoutType: WorkoutType.rc,
        date: '2021-08-28T07:00:09Z' as ISO8601,
        routePoints: [ 'Горячий Ключ', 'Кутаис', 'Горячий Ключ' ],
        oneWayRoute: false,
        venue: 'На магазине',
        distance: 50,
        speed: 30,
        bikeType: BikeType.road,
        members: [
          {
            id: '1',
            login: 'login',
            email: 'mail@mail.ru',
            name: 'Илья',
            lastAuthTime: '2021-08-28T05:42:09Z' as ISO8601
          },
          {
            id: '1',
            login: 'login',
            email: 'mail@mail.ru',
            name: 'Василий',
            lastAuthTime: '2021-08-28T05:42:09Z' as ISO8601
          },
          {
            id: '1',
            login: 'login',
            email: 'mail@mail.ru',
            name: 'Олег',
            lastAuthTime: '2021-08-28T05:42:09Z' as ISO8601
          },
          {
            id: '1',
            login: 'login',
            email: 'mail@mail.ru',
            name: 'Пётр',
            lastAuthTime: '2021-08-28T05:42:09Z' as ISO8601
          }
        ]
      },
      {
        workoutType: WorkoutType.tr,
        date: '2021-08-28T06:00:09Z' as ISO8601,
        routePoints: [ 'ДБ Екатерининский', 'Мачуги' ],
        oneWayRoute: true,
        venue: 'Напротив дворца бракосочетания',
        distance: 50,
        speed: 25,
        bikeType: BikeType.road,
        members: [
          {
            id: '1',
            login: 'login',
            email: 'mail@mail.ru',
            name: 'Илья',
            lastAuthTime: '2021-08-28T05:42:09Z' as ISO8601
          },
          {
            id: '1',
            login: 'login',
            email: 'mail@mail.ru',
            name: 'Василий',
            lastAuthTime: '2021-08-28T05:42:09Z' as ISO8601
          },
          {
            id: '1',
            login: 'login',
            email: 'mail@mail.ru',
            name: 'Олег',
            lastAuthTime: '2021-08-28T05:42:09Z' as ISO8601
          },
          {
            id: '1',
            login: 'login',
            email: 'mail@mail.ru',
            name: 'Пётр',
            lastAuthTime: '2021-08-28T05:42:09Z' as ISO8601
          }
        ]
      },
    ]
  },
  {
    date: '2021-03-08T07:42:09Z',
    workouts: [
      {
        workoutType: WorkoutType.an,
        date: '2021-08-28T05:15:09Z' as ISO8601,
        routePoints: [ 'Тахтамукай', 'Калужская', 'Тахтамукай' ],
        oneWayRoute: false,
        venue: 'Где-то',
        distance: 60,
        speed: 25,
        bikeType: BikeType.cx,
        members: [
          {
            id: '1',
            login: 'login',
            email: 'mail@mail.ru',
            name: 'Илья',
            lastAuthTime: '2021-08-28T05:42:09Z' as ISO8601
          },
          {
            id: '1',
            login: 'login',
            email: 'mail@mail.ru',
            name: 'Василий',
            lastAuthTime: '2021-08-28T05:42:09Z' as ISO8601
          },
          {
            id: '1',
            login: 'login',
            email: 'mail@mail.ru',
            name: 'Олег',
            lastAuthTime: '2021-08-28T05:42:09Z' as ISO8601
          },
          {
            id: '1',
            login: 'login',
            email: 'mail@mail.ru',
            name: 'Пётр',
            lastAuthTime: '2021-08-28T05:42:09Z' as ISO8601
          }
        ]
      },
      {
        workoutType: WorkoutType.tp,
        date: '2021-08-28T05:42:09Z' as ISO8601,
        routePoints: [ 'Смоленская', 'Крепостная', 'Смоленская' ],
        oneWayRoute: false,
        venue: 'Перед подъемом',
        distance: 50,
        speed: 20,
        bikeType: BikeType.mtb,
        members: [
          {
            id: '1',
            login: 'login',
            email: 'mail@mail.ru',
            name: 'Илья',
            lastAuthTime: '2021-08-28T05:42:09Z' as ISO8601
          },
          {
            id: '1',
            login: 'login',
            email: 'mail@mail.ru',
            name: 'Василий',
            lastAuthTime: '2021-08-28T05:42:09Z' as ISO8601
          },
          {
            id: '1',
            login: 'login',
            email: 'mail@mail.ru',
            name: 'Олег',
            lastAuthTime: '2021-08-28T05:42:09Z' as ISO8601
          },
          {
            id: '1',
            login: 'login',
            email: 'mail@mail.ru',
            name: 'Пётр',
            lastAuthTime: '2021-08-28T05:42:09Z' as ISO8601
          }
        ]
      },
      {
        workoutType: WorkoutType.rc,
        date: '2021-08-28T07:00:09Z' as ISO8601,
        routePoints: [ 'Горячий Ключ', 'Кутаис', 'Горячий Ключ' ],
        oneWayRoute: false,
        venue: 'Магазин',
        distance: 50,
        speed: 30,
        bikeType: BikeType.road,
        members: [
          {
            id: '1',
            login: 'login',
            email: 'mail@mail.ru',
            name: 'Илья',
            lastAuthTime: '2021-08-28T05:42:09Z' as ISO8601
          },
          {
            id: '1',
            login: 'login',
            email: 'mail@mail.ru',
            name: 'Василий',
            lastAuthTime: '2021-08-28T05:42:09Z' as ISO8601
          },
          {
            id: '1',
            login: 'login',
            email: 'mail@mail.ru',
            name: 'Олег',
            lastAuthTime: '2021-08-28T05:42:09Z' as ISO8601
          },
          {
            id: '1',
            login: 'login',
            email: 'mail@mail.ru',
            name: 'Пётр',
            lastAuthTime: '2021-08-28T05:42:09Z' as ISO8601
          }
        ]
      },
      {
        workoutType: WorkoutType.ed,
        date: '2021-08-28T07:30:09Z' as ISO8601,
        routePoints: [ 'Пашковский Хлебзавод', 'Горячий Ключ', 'Пашковский Хлебзавод' ],
        oneWayRoute: false,
        venue: 'На развилке',
        distance: 100,
        speed: 25,
        bikeType: BikeType.road,
        members: [
          {
            id: '1',
            login: 'login',
            email: 'mail@mail.ru',
            name: 'Илья',
            lastAuthTime: '2021-08-28T05:42:09Z' as ISO8601
          },
          {
            id: '1',
            login: 'login',
            email: 'mail@mail.ru',
            name: 'Василий',
            lastAuthTime: '2021-08-28T05:42:09Z' as ISO8601
          },
          {
            id: '1',
            login: 'login',
            email: 'mail@mail.ru',
            name: 'Олег',
            lastAuthTime: '2021-08-28T05:42:09Z' as ISO8601
          },
          {
            id: '1',
            login: 'login',
            email: 'mail@mail.ru',
            name: 'Пётр',
            lastAuthTime: '2021-08-28T05:42:09Z' as ISO8601
          }
        ]
      }
    ]
  },
  {
    date: '2021-03-09T07:42:09Z',
    workouts: [
      {
        workoutType: WorkoutType.an,
        date: '2021-08-28T05:15:09Z' as ISO8601,
        routePoints: [ 'Тахтамукай', 'Калужская' ],
        oneWayRoute: false,
        venue: 'Где-то',
        distance: 60,
        speed: 25,
        bikeType: BikeType.cx,
        members: [
          {
            id: '1',
            login: 'login',
            email: 'mail@mail.ru',
            name: 'Илья',
            lastAuthTime: '2021-08-28T05:42:09Z' as ISO8601
          },
          {
            id: '1',
            login: 'login',
            email: 'mail@mail.ru',
            name: 'Василий',
            lastAuthTime: '2021-08-28T05:42:09Z' as ISO8601
          },
          {
            id: '1',
            login: 'login',
            email: 'mail@mail.ru',
            name: 'Олег',
            lastAuthTime: '2021-08-28T05:42:09Z' as ISO8601
          },
          {
            id: '1',
            login: 'login',
            email: 'mail@mail.ru',
            name: 'Пётр',
            lastAuthTime: '2021-08-28T05:42:09Z' as ISO8601
          }
        ]
      },
      {
        workoutType: WorkoutType.ed,
        date: '2021-08-28T05:42:09Z' as ISO8601,
        routePoints: [ 'Смоленская', 'Крепостная' ],
        oneWayRoute: false,
        venue: 'Где-то',
        distance: 50,
        speed: 20,
        bikeType: BikeType.mtb,
        members: [
          {
            id: '1',
            login: 'login',
            email: 'mail@mail.ru',
            name: 'Илья',
            lastAuthTime: '2021-08-28T05:42:09Z' as ISO8601
          },
          {
            id: '1',
            login: 'login',
            email: 'mail@mail.ru',
            name: 'Василий',
            lastAuthTime: '2021-08-28T05:42:09Z' as ISO8601
          },
          {
            id: '1',
            login: 'login',
            email: 'mail@mail.ru',
            name: 'Олег',
            lastAuthTime: '2021-08-28T05:42:09Z' as ISO8601
          },
          {
            id: '1',
            login: 'login',
            email: 'mail@mail.ru',
            name: 'Пётр',
            lastAuthTime: '2021-08-28T05:42:09Z' as ISO8601
          }
        ]
      },
      {
        workoutType: WorkoutType.tr,
        date: '2021-08-28T07:00:09Z' as ISO8601,
        routePoints: [ 'Горячий Ключ', 'Кутаис' ],
        oneWayRoute: false,
        venue: 'Где-то',
        distance: 50,
        speed: 30,
        bikeType: BikeType.road,
        members: [
          {
            id: '1',
            login: 'login',
            email: 'mail@mail.ru',
            name: 'Илья',
            lastAuthTime: '2021-08-28T05:42:09Z' as ISO8601
          },
          {
            id: '1',
            login: 'login',
            email: 'mail@mail.ru',
            name: 'Василий',
            lastAuthTime: '2021-08-28T05:42:09Z' as ISO8601
          },
          {
            id: '1',
            login: 'login',
            email: 'mail@mail.ru',
            name: 'Олег',
            lastAuthTime: '2021-08-28T05:42:09Z' as ISO8601
          },
          {
            id: '1',
            login: 'login',
            email: 'mail@mail.ru',
            name: 'Пётр',
            lastAuthTime: '2021-08-28T05:42:09Z' as ISO8601
          }
        ]
      }
    ]
  },
  {
    date: '2021-03-10T07:42:09Z',
    workouts: [
      {
        workoutType: WorkoutType.an,
        date: '2021-08-28T05:15:09Z' as ISO8601,
        routePoints: [ 'Тахтамукай', 'Калужская' ],
        oneWayRoute: false,
        venue: 'Где-то',
        distance: 60,
        speed: 25,
        bikeType: BikeType.cx,
        members: [
          {
            id: '1',
            login: 'login',
            email: 'mail@mail.ru',
            name: 'Илья',
            lastAuthTime: '2021-08-28T05:42:09Z' as ISO8601
          },
          {
            id: '1',
            login: 'login',
            email: 'mail@mail.ru',
            name: 'Василий',
            lastAuthTime: '2021-08-28T05:42:09Z' as ISO8601
          },
          {
            id: '1',
            login: 'login',
            email: 'mail@mail.ru',
            name: 'Олег',
            lastAuthTime: '2021-08-28T05:42:09Z' as ISO8601
          },
          {
            id: '1',
            login: 'login',
            email: 'mail@mail.ru',
            name: 'Пётр',
            lastAuthTime: '2021-08-28T05:42:09Z' as ISO8601
          }
        ]
      }
    ]
  }
]
