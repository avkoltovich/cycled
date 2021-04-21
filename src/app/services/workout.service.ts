import { Injectable } from '@angular/core'
import { WorkoutModel } from '../models/workout.model'
import { HttpClient } from '@angular/common/http'
import { API_URL } from '../shared/constants'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  constructor(private http: HttpClient) {
  }

  public create(body: Omit<WorkoutModel, '_id'>): Observable<WorkoutModel> {
    return this.http.post<WorkoutModel>(`${ API_URL }/workout/create`, body)
  }
}
