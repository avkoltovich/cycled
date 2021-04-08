import { ISO8601 } from './base.model'

export interface UserModel {
  id: string
  login: string
  email: string
  name: string
  lastAuthTime: ISO8601
}
