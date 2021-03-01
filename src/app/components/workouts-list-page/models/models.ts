export interface WorkoutCard {
  workoutType: string
  date: string
  routePoints: string[]
  oneWayRoute: boolean
  distance: number
  speed: number
  bikeType: string
  members: any[]
}

export interface WorkoutCardList {
  date: string
  workouts: WorkoutCard[]
}
