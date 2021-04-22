import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { WorkoutModel } from '../models/workout.model'
import { API_URL } from '../../shared/constants'

@Injectable({
  providedIn: 'root'
})
export class WorkoutNetworkService {

  constructor(private http: HttpClient) {
  }

  public create(body: Omit<WorkoutModel, '_id'>): Observable<WorkoutModel> {
    const headers = new HttpHeaders()

    return this.http.post<WorkoutModel>(`${ API_URL }/workout/create`, body, { headers })
  }

  public getAll(): Observable<WorkoutModel[]> {
    return this.http.get<WorkoutModel[]>(`${ API_URL }/workout/list`)
  }

  public getById(id: string): Observable<WorkoutModel[]> {
    return this.http.get<WorkoutModel[]>(`${ API_URL }/workout/${ id }`)
  }

  public delete(id: string): Observable<WorkoutModel[] | null> {
    return this.http.delete<WorkoutModel[] | null>(`${ API_URL }/workout/${ id }`)
  }

  public update(id: string, body: Omit<WorkoutModel, '_id'>): Observable<WorkoutModel> {
    const headers = new HttpHeaders()

    return this.http.patch<WorkoutModel>(`${ API_URL }/workout/${ id }`, body, { headers })
  }
}
