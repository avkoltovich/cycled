import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WorkoutListPageComponent } from './components/workouts-list-page/workout-list-page.component';
import { AddWorkoutPageComponent } from './components/add-workout-page/add-workout-page.component';

const routes: Routes = [
  {
    path: '',
    component: WorkoutListPageComponent
  },
  {
    path: 'add-workout',
    component: AddWorkoutPageComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
