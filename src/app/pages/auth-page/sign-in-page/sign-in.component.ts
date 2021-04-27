import { Component } from '@angular/core'
import { AuthService } from '../../../services/auth.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router'
import { FormControl, Validators } from '@angular/forms'
import { catchError, take, tap } from 'rxjs/operators'
import { HttpErrorResponse } from '@angular/common/http'
import { EMPTY } from 'rxjs'
import { JWT_TOKEN } from '../../../../shared/constants'

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

  constructor(private authService: AuthService,
              private snackBar: MatSnackBar,
              private router: Router) {
  }

  public onLoginButtonClick(): void {
    this.isLoading = true
    this.authService.login({
      login: this.email.value,
      password: this.password.value
    }).pipe(
      take(1),
      tap(({ access_token }: { access_token: string }) => {
        this.snackBar.open('Вы успешно авторизованы', '', { duration: 3000, panelClass: 'cycled-snackbar' })
        this.isLoading = false
        window.localStorage.setItem(JWT_TOKEN, access_token)
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
