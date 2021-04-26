import { Component } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { AuthService } from '../../../services/auth.service'
import { catchError, take, tap } from 'rxjs/operators'
import { HttpErrorResponse } from '@angular/common/http'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router'
import { EMPTY } from 'rxjs'

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

  constructor(private authService: AuthService,
              private snackBar: MatSnackBar,
              private router: Router) {
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
      take(1),
      tap(() => {
        this.snackBar.open('Пользователь успешно зарегистрирован', '', { duration: 3000, panelClass: 'cycled-snackbar' })
        this.isLoading = false
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
