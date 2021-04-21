import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MainMenuComponent } from './components/main-menu/main-menu.component'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatDialogModule } from '@angular/material/dialog'

import { WorkoutCardComponent } from './components/workouts-list-page/components/workout-card/workout-card.component'
import { WorkoutCardListComponent } from './components/workouts-list-page/components/workout-card-list/workout-card-list.component'
import { PowerZonesDialogComponent } from './components/workouts-list-page/dialogs/power-zones-dialog/power-zones-dialog.component'
import { AddWorkoutButtonComponent } from './components/workouts-list-page/components/add-workout-button/add-workout-button.component'
import { WorkoutListPageComponent } from './components/workouts-list-page/workout-list-page.component'
import { AddWorkoutPageComponent } from './components/add-workout-page/add-workout-page.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatStepperModule } from '@angular/material/stepper'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatRadioModule } from '@angular/material/radio'
import { WorkoutMainInfoComponent } from './components/workouts-list-page/components/workout-main-info/workout-main-info.component'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { DateAdapter, MAT_DATE_LOCALE, MatNativeDateModule, NativeDateAdapter } from '@angular/material/core'
import { SignInComponent } from './components/auth-page/sign-in-page/sign-in.component'
import { SignUpComponent } from './components/auth-page/sign-up-page/sign-up.component'
import { HttpClientModule } from '@angular/common/http'

export class CustomDateAdapter extends NativeDateAdapter {

  parse(value: any): Date | null {
    if ((typeof value === 'string') && (value.indexOf('.') > -1)) {
      const str = value.split('.')

      const year = Number(str[ 2 ])
      const month = Number(str[ 1 ]) - 1
      const date = Number(str[ 0 ])

      return new Date(year, month, date)
    }

    const timestamp = typeof value === 'number' ? value : Date.parse(value)

    return isNaN(timestamp) ? null : new Date(timestamp)
  }

  format(date, displayFormat): string {
    date = new Date(Date.UTC(
      date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(),
      date.getMinutes(), date.getSeconds(), date.getMilliseconds()))
    displayFormat = Object.assign({}, displayFormat, { timeZone: 'utc' })

    const dtf = new Intl.DateTimeFormat(this.locale, displayFormat)
    return dtf.format(date).replace(/[\u200e\u200f]/g, '')
  }
}

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    WorkoutCardComponent,
    WorkoutCardListComponent,
    WorkoutListPageComponent,
    PowerZonesDialogComponent,
    AddWorkoutButtonComponent,
    AddWorkoutPageComponent,
    WorkoutMainInfoComponent,
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule,
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'ru-RU'
    },
    {
      provide: DateAdapter,
      useClass: CustomDateAdapter
    }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
