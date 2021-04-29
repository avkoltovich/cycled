import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { API_URL, JWT_TOKEN, USER_EMAIL, USER_ID } from '../../shared/constants'
import { Observable, Subject } from 'rxjs'
import { AuthDto } from '../models/auth.dto'
import { UserModel } from '../models/user.model'
import { AuthModel } from '../models/auth.model'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuthorized = new Subject()

  constructor(private http: HttpClient,
              private router: Router) {
  }

  public register(user: AuthDto): Observable<UserModel> {
    const headers = new HttpHeaders()

    return this.http.post<UserModel>(`${ API_URL }/auth/register`, user, { headers })
  }

  public login(user: AuthDto): Observable<AuthModel> {
    const headers = new HttpHeaders()

    return this.http.post<AuthModel>(`${ API_URL }/auth/login`, user, { headers })
  }

  public logout(): void {
    window.localStorage.removeItem(JWT_TOKEN)
    window.localStorage.removeItem(USER_EMAIL)
    window.localStorage.removeItem(USER_ID)
    this.isAuthorized.next()
    this.router.navigate([ '' ])
  }
}
