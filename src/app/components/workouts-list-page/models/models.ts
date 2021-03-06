export interface WorkoutCard {
  workoutType: string | null
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

export interface WorkoutListDate {
  dayOfWeek: string,
  date: string
}
