import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { WorkoutListPageComponent } from './pages/workouts-list-page/workout-list-page.component'
import { AddWorkoutPageComponent } from './pages/add-workout-page/add-workout-page.component'
import { SignInComponent } from './pages/auth-page/sign-in-page/sign-in.component'
import { SignUpComponent } from './pages/auth-page/sign-up-page/sign-up.component'
import { WorkoutPageComponent } from './pages/workout-page/workout-page.component'

const routes: Routes = [
  {
    path: '',
    component: WorkoutListPageComponent
  },
  {
    path: 'add-workout',
    component: AddWorkoutPageComponent
  },
  {
    path: 'login',
    component: SignInComponent
  },
  {
    path: 'register',
    component: SignUpComponent
  },
  {
    path: 'workout/:id',
    component: WorkoutPageComponent
  },
]

@NgModule({
  imports: [ RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
