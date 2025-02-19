import axios from 'axios'

interface fetchWrapProps {
	method: 'get' | 'post' | 'put' | 'delete'
	url: string
	body?: {}
	signal?: AbortSignal
}

const fetchWrap = async ({ method, url, body, signal }: fetchWrapProps) => {
	const jwtToken = localStorage.getItem('jwtToken')
	const config = {
		baseURL: 'http://127.0.0.1:8080/api',
		headers: {
			Authorization: !!jwtToken ? `Bearer ${jwtToken}` : ''
		},
		signal: signal
	}

	try {
		const { data } =
			(method === 'get' && (await axios.get(url, config))) ||
			(method === 'post' && (await axios.post(url, body, config))) ||
			(method === 'put' && (await axios.put(url, body, config))) ||
			(method === 'delete' && (await axios.delete(url, config))) ||
			{}
		return data
	} catch (e) {
		throw e
	}
}

export const GET = (url: string, signal?: AbortSignal) =>
	fetchWrap({ method: 'get', url, signal })

export const POST = (url: string, body?: {}) =>
	fetchWrap({ method: 'post', url, body })

export const PUT = (url: string, body?: {}) =>
	fetchWrap({ method: 'put', url, body })

export const DELETE = (url: string) => fetchWrap({ method: 'delete', url })
