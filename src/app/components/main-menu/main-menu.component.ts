import { Component } from '@angular/core'
import { AuthService } from '../../services/auth.service'
import { Observable } from 'rxjs'
import { map, startWith } from 'rxjs/operators'
import { JWT_TOKEN, USER_EMAIL } from '../../../shared/constants'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: [ './main-menu.component.scss' ]
})
export class MainMenuComponent {
  public isMenuOpen = false
  public userEmail = window.localStorage.getItem(USER_EMAIL)
  public isNotAuthorized: Observable<boolean> = this.authService.isAuthorized.pipe(
    startWith(window.localStorage.getItem(JWT_TOKEN) === null),
    map(() => {
      this.userEmail = window.localStorage.getItem(USER_EMAIL)
      return window.localStorage.getItem(JWT_TOKEN) === null
    })
  )

  constructor(private authService: AuthService,
              private snackBar: MatSnackBar) {
  }

  public onClickMenuButton(): void {
    this.isMenuOpen = !this.isMenuOpen
  }

  public onClickLogoutButton(): void {
    this.authService.logout()

    this.snackBar.open('Вы успешно вышли из учетной записи', '', { duration: 3000, panelClass: 'cycled-snackbar' })
  }
}
