import axios from 'axios'

import { TestInCreate } from '../types'
import { GET, POST } from './config'

export const getTests = (signal: AbortSignal) => GET('/practice', signal)
export const createTest = (body: TestInCreate) => POST('/practice', body)

export const getPracticeQuestions = (tid: string, signal: AbortSignal) =>
	GET(`/practice/${tid}`, signal)

export const createPracticeQuestion = async (body: {
	context: string
	tid: string
}) => {
	const jwtToken = localStorage.getItem('jwtToken')

	const config = {
		baseURL: 'http://127.0.0.1:8000/api',
		headers: {
			Authorization: !!jwtToken ? `Bearer ${jwtToken}` : ''
		}
	}

	const { data } = await axios.post(`/practice`, body, config)
	return data
}
