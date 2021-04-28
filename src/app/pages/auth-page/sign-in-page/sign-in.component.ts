import { Component } from '@angular/core'
import { AuthService } from '../../../services/auth.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router'
import { FormControl, Validators } from '@angular/forms'
import { catchError, map, startWith, take, tap } from 'rxjs/operators'
import { HttpErrorResponse } from '@angular/common/http'
import { combineLatest, EMPTY } from 'rxjs'
import { JWT_TOKEN, USER_EMAIL, USER_ID } from '../../../../shared/constants'
import { AuthModel } from '../../../models/auth.model'

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in.component.html',
  styleUrls: [ '../auth-page.component.scss' ]
})
export class SignInComponent {
  public hide = true
  public isLoading = false
  public email = new FormControl('', [ Validators.required, Validators.email ])
  public password = new FormControl('', [ Validators.required ])

  public isInvalidForm = combineLatest([
    this.password.valueChanges.pipe(
      startWith(null)
    ),
    this.email.valueChanges.pipe(
      startWith(null)
    )
  ]).pipe(
    map(() => {
      return this.email.invalid || this.password.invalid
    })
  )

  constructor(private authService: AuthService,
              private snackBar: MatSnackBar,
              private router: Router) {
  }

  /**
   * TODO: Написать хэндлер на клавишу энтер
   */
  public onLoginButtonClick(): void {
    this.isLoading = true
    this.authService.login({
      login: this.email.value,
      password: this.password.value
    }).pipe(
      take(1),
      tap((authPayload: AuthModel) => {
        this.snackBar.open('Вы успешно авторизованы', '', { duration: 3000, panelClass: 'cycled-snackbar' })
        this.isLoading = false
        window.localStorage.setItem(JWT_TOKEN, authPayload.accessToken)
        window.localStorage.setItem(USER_EMAIL, authPayload.email)
        window.localStorage.setItem(USER_ID, authPayload.userId)
        this.authService.isAuthorized.next()
        this.router.navigate([ '' ])
      }),
      catchError((error: HttpErrorResponse) => {
        this.snackBar.open(`${ error.error.message }`, '', { duration: 3000, panelClass: 'cycled-snackbar' })
        this.isLoading = false
        return EMPTY
      })
    ).subscribe()
  }
}
