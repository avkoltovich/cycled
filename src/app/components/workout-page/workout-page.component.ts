import { Component, OnInit } from '@angular/core'
import { generateWorkoutCalendar, WorkoutListByDay, WorkoutModel } from '../../models/workout.model'
import { ActivatedRoute, ParamMap } from '@angular/router'
import { map, switchMap } from 'rxjs/operators'
import { WorkoutService } from '../../services/workout.service'
import { Observable } from 'rxjs'

@Component({
    selector: 'app-workout-page',
    templateUrl: './workout-page.component.html',
    styleUrls: ['./workout-page.component.scss']
})
export class WorkoutPageComponent implements OnInit {

    public workoutList: Observable<WorkoutListByDay> = this.activatedRoute.paramMap.pipe(
        map((paramMap: ParamMap) => paramMap.get('id')),
        switchMap((id: string) => this.workoutService.getById(id)),
        map((workouts: WorkoutModel[]) => {
            const [workoutListByDate] = generateWorkoutCalendar(workouts)

            return workoutListByDate
        })
    )

    constructor(private activatedRoute: ActivatedRoute,
        private workoutService: WorkoutService) {
    }

    ngOnInit(): void {
    }

}
