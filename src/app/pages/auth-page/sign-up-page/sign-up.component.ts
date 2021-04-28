import { Component } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { AuthService } from '../../../services/auth.service'
import { catchError, map, startWith, switchMap, tap } from 'rxjs/operators'
import { HttpErrorResponse } from '@angular/common/http'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router'
import { combineLatest, EMPTY } from 'rxjs'
import { JWT_TOKEN, USER_EMAIL, USER_ID } from '../../../../shared/constants'
import { AuthModel } from '../../../models/auth.model'

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up.component.html',
  styleUrls: [ '../auth-page.component.scss' ]
})
export class SignUpComponent {
  public hide = true
  public isLoading = false
  public email = new FormControl('', [ Validators.required, Validators.email ])
  public password = new FormControl('', [ Validators.required ])
  public repeatedPassword = new FormControl('', [ Validators.required ])

  public isInvalidForm = combineLatest([
    this.password.valueChanges.pipe(
      startWith(null)
    ),
    this.repeatedPassword.valueChanges.pipe(
      startWith(null)
    ),
    this.email.valueChanges.pipe(
      startWith(null)
    )
  ]).pipe(
    map(([ password, repeatedPassword ]: [ string, string, string ]) => {
      if (password !== repeatedPassword) {
        this.repeatedPassword.setErrors({ incorrect: true })
      }

      return this.email.invalid || this.password.invalid || password !== repeatedPassword
    })
  )

  constructor(private authService: AuthService,
              private snackBar: MatSnackBar,
              private router: Router) {
    this.isInvalidForm.subscribe()
  }

  public getErrorMessage(): string {
    if (this.email.hasError('required')) {
      return 'Вы должны ввести email'
    }

    return this.email.hasError('email') ? 'Невалидный email' : ''
  }

  public onRegisterButtonClick(): void {
    this.isLoading = true
    this.authService.register({
      login: this.email.value,
      password: this.password.value
    }).pipe(
      switchMap(() => this.authService.login({
        login: this.email.value,
        password: this.password.value
      }).pipe(
        tap((authPayload: AuthModel) => {
          this.snackBar.open('Пользователь успешно зарегистрирован', '', { duration: 3000, panelClass: 'cycled-snackbar' })
          this.isLoading = false
          window.localStorage.setItem(JWT_TOKEN, authPayload.accessToken)
          window.localStorage.setItem(USER_EMAIL, authPayload.email)
          window.localStorage.setItem(USER_ID, authPayload.userId)
          this.authService.isAuthorized.next()
          this.router.navigate([ '' ])
        })
      )),
      catchError((error: HttpErrorResponse) => {
        this.snackBar.open(`${ error.error.message }`, '', { duration: 3000, panelClass: 'cycled-snackbar' })
        this.isLoading = false
        return EMPTY
      })
    ).subscribe()
  }
}
