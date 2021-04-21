import { ISO8601 } from '../models/base.model'

export const checkEqualDates = (a: ISO8601, b: ISO8601): boolean => {
    const firstDate = new Date(a)
    const secondDate = new Date(b)

    return firstDate.getFullYear() === secondDate.getFullYear() && firstDate.getMonth() === secondDate.getMonth() && firstDate.getDate() === secondDate.getDate()
}