import { ISO8601 } from './base.model'
import { UserModel } from './user.model'

export const enum WorkoutType {
  rc = 'RC',
  ed = 'ED',
  tp = 'TP',
  tr = 'TR',
  vo = 'VO',
  an = 'AN'
}

export const enum BikeType {
  any = 'ANY',
  road = 'ROAD',
  cx = 'CX',
  mtb = 'MTB',
}

export const bikeTypeMap = {
  [ BikeType.any ]: 'Любой',
  [ BikeType.road ]: 'Шоссейный',
  [ BikeType.cx ]: 'Велокроссовый',
  [ BikeType.mtb ]: 'Горный'
}

export const workoutShortTypeMap = {
  [ WorkoutType.rc ]: 'R',
  [ WorkoutType.ed ]: 'E',
  [ WorkoutType.tp ]: 'T',
  [ WorkoutType.tr ]: 'T',
  [ WorkoutType.vo ]: 'V',
  [ WorkoutType.an ]: 'A'
}

export const workoutFullTypeMap = {
  [ WorkoutType.rc ]: 'Recovery',
  [ WorkoutType.ed ]: 'Endurance',
  [ WorkoutType.tp ]: 'Tempo',
  [ WorkoutType.tr ]: 'Threshold',
  [ WorkoutType.vo ]: 'VO2 Max',
  [ WorkoutType.an ]: 'Anaerobic'
}

export interface WorkoutModel {
  _id: string
  workoutType: WorkoutType | null
  date: ISO8601
  routePoints: string[]
  oneWayRoute: boolean
  venue: string
  distance: number
  speed: number | null
  duration: number | null
  bikeType: BikeType
  members: UserModel[]
}

export interface WorkoutCardList {
  date: string
  workouts: WorkoutModel[]
}

export interface WorkoutListDate {
  dayOfWeek: string,
  date: string
}
