import { GET, POST } from './config'
import { CourseInCreate } from '../types'

export const getCourses = (signal: AbortSignal) => GET('/course', signal)
export const createCourses = (body: CourseInCreate) => POST('/course', body)
