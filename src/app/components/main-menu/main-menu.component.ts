import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: [ './main-menu.component.scss' ]
})
export class MainMenuComponent implements OnInit {
  public isMenuOpen = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  public onClickMenuButton(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
