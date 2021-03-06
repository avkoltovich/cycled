import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { WorkoutListPageComponent } from './components/workouts-list-page/workout-list-page.component'
import { AddWorkoutPageComponent } from './components/add-workout-page/add-workout-page.component'
import { SignInComponent } from './components/auth-page/sign-in-page/sign-in.component'
import { SignUpComponent } from './components/auth-page/sign-up-page/sign-up.component'

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
]

@NgModule({
  imports: [ RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
