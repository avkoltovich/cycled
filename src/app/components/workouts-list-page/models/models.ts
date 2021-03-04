export interface WorkoutCard {
  workoutType: string
  date: string
  routePoints: string[]
  oneWayRoute: boolean
  distance: number
  speed?: number | null
  duration?: number | null
  bikeType: string
  members: any[]
}

export interface WorkoutCardList {
  date: string
  workouts: WorkoutCard[]
}
