import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in.component.html',
  styleUrls: [ '../auth-page.component.scss' ]
})
export class SignInComponent implements OnInit {
  public hide = true

  constructor() {
  }

  ngOnInit(): void {
  }

}
