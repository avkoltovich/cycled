import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { WorkoutCardComponent } from './components/workouts-list-page/components/workout-card/workout-card.component';
import { WorkoutCardListComponent } from './components/workouts-list-page/components/workout-card-list/workout-card-list.component';
import { PowerZonesDialogComponent } from './components/workouts-list-page/dialogs/power-zones-dialog/power-zones-dialog.component';
import { AddWorkoutButtonComponent } from './components/workouts-list-page/components/add-workout-button/add-workout-button.component';
import { WorkoutListPageComponent } from './components/workouts-list-page/workout-list-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    WorkoutCardComponent,
    WorkoutCardListComponent,
    WorkoutListPageComponent,
    PowerZonesDialogComponent,
    AddWorkoutButtonComponent
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
