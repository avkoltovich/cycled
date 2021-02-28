import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { WorkoutCardComponent } from './components/workout-card/workout-card.component';
import { MatCardModule } from '@angular/material/card';
import { WorkoutCardListComponent } from './components/workout-card-list/workout-card-list.component';
import { WorkoutCalendarComponent } from './components/workout-calendar/workout-calendar.component';
import { PowerZonesDialogComponent } from './dialogs/power-zones-dialog/power-zones-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AddWorkoutComponent } from './components/add-workout/add-workout.component';

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    WorkoutCardComponent,
    WorkoutCardListComponent,
    WorkoutCalendarComponent,
    PowerZonesDialogComponent,
    AddWorkoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
