import axios from 'axios'

export const getExplainSource = async (body: { question: string }) => {
	const jwtToken = localStorage.getItem('jwtToken')
	const config = {
		baseURL: 'http://127.0.0.1:8000/api',
		headers: {
			Authorization: !!jwtToken ? `Bearer ${jwtToken}` : ''
		}
	}

	const { data } = await axios.post(`/question-answer`, body, config)
	return data
}
