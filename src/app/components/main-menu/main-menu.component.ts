import { Component } from '@angular/core'
import { AuthService } from '../../services/auth.service'
import { Observable } from 'rxjs'
import { map, startWith } from 'rxjs/operators'
import { JWT_TOKEN, USER_EMAIL, USER_ID } from '../../../shared/constants'
import { Router } from '@angular/router'

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
              private router: Router) {
  }

  public onClickMenuButton(): void {
    this.isMenuOpen = !this.isMenuOpen
  }

  public onClickLogoutButton(): void {
    window.localStorage.removeItem(JWT_TOKEN)
    window.localStorage.removeItem(USER_EMAIL)
    window.localStorage.removeItem(USER_ID)
    this.authService.isAuthorized.next()
    this.router.navigate([ '' ])
  }
}
