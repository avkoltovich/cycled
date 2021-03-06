import { Component, OnInit } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up.component.html',
  styleUrls: [ '../auth-page.component.scss' ]
})
export class SignUpComponent implements OnInit {
  public hide = true
  public email = new FormControl('', [ Validators.required, Validators.email ])

  constructor() {
  }

  public ngOnInit(): void {
  }

  public getErrorMessage(): string {
    if (this.email.hasError('required')) {
      return 'Вы должны ввести email'
    }

    return this.email.hasError('email') ? 'Невалидный email' : ''
  }
}
