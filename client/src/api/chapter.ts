import { GET, POST } from './config'
import { ChapterInCreate } from '../types'

export const getChapters = (cid: string, signal: AbortSignal) =>
	GET(`/course/${cid}`, signal)
export const getChapter = (cid: string, name: string, signal: AbortSignal) =>
	GET(`/course/${cid}/${name}`, signal)
export const createChapter = (body: ChapterInCreate, cid: string) =>
	POST(`/course/${cid}`, body)
