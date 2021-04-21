import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ISO8601 } from 'src/app/models/base.model';
import { WorkoutService } from 'src/app/services/workout.service';
import { WorkoutCalendar, WorkoutModel } from '../../models/workout.model';


@Component({
  selector: 'app-workout-list-page',
  templateUrl: './workout-list-page.component.html',
  styleUrls: ['./workout-list-page.component.scss'],
})
export class WorkoutListPageComponent implements OnInit {

  public workoutCalendar = this.workoutService.getAll().pipe(
    map((workouts: WorkoutModel[]) => this.generateWorkoutCalendar(workouts))
  )

  constructor(private workoutService: WorkoutService) {
  }

  ngOnInit(): void {
  }

  private generateWorkoutCalendar(workouts: WorkoutModel[]): WorkoutCalendar[] {
    const sortedWorkouts = workouts.slice().sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    const workoutCalendar: WorkoutCalendar[] = []

    let currentDate = null
    let currentCalendarItemIndex = 0

    sortedWorkouts.forEach((workout) => {
      if (currentDate === null) {
        currentDate = workout.date

        workoutCalendar.push({
          date: workout.date,
          workouts: [workout]
        })
      } else {
        if (this.checkEqualDates(currentDate, workout.date)) {
          workoutCalendar[currentCalendarItemIndex].workouts.push(workout)
        } else {
          currentDate = workout.date
          currentCalendarItemIndex += 1

          workoutCalendar.push({
            date: workout.date,
            workouts: [workout]
          })
        }
      }
    })

    return workoutCalendar
  }

  private checkEqualDates(a: ISO8601, b: ISO8601): boolean {
    const firstDate = new Date(a)
    const secondDate = new Date(b)

    return firstDate.getFullYear() === secondDate.getFullYear() && firstDate.getMonth() === secondDate.getMonth() && firstDate.getDate() === secondDate.getDate()
  }

}
