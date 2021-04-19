import { ISO8601 } from './base.model'

export interface UserModel {
  _id: string
  login: string
  email: string
  name: string
  createTime: ISO8601
  lastAuthTime: ISO8601
}
