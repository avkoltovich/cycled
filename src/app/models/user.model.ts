import { ISO8601 } from './base.model'

export interface UserModel {
  _id: string
  email: string
  passwordHash: string
  createdAt: ISO8601
  updatedAt: ISO8601
}
