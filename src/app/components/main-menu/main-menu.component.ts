import { Component } from '@angular/core'
import { AuthService } from '../../services/auth.service'
import { Observable } from 'rxjs'
import { map, startWith } from 'rxjs/operators'
import { JWT_TOKEN } from '../../../shared/constants'

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: [ './main-menu.component.scss' ]
})
export class MainMenuComponent {
  public isMenuOpen = false
  public isNotAuthorized: Observable<boolean> = this.authService.isAuthorized.pipe(
    startWith(window.localStorage.getItem(JWT_TOKEN) === null),
    map(() => window.localStorage.getItem(JWT_TOKEN) === null)
  )

  constructor(private authService: AuthService) {
  }

  public onClickMenuButton(): void {
    this.isMenuOpen = !this.isMenuOpen
  }
}
