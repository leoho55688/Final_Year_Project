import axios, { AxiosResponse } from 'axios'
import { UserInLogin, UserInRegister, AuthResponse } from '../types'

const userRequest = axios.create({
	baseURL: 'http://127.0.0.1:8080/api/auth'
})

export const apiUserLogin = (
	user: UserInLogin
): Promise<AxiosResponse<AuthResponse>> =>
	userRequest.post('/login', {
		email: user.email,
		password: user.password
	})

export const apiUserRegister = (
	user: UserInRegister
): Promise<AxiosResponse<AuthResponse>> =>
	userRequest.post('/signup', {
		name: user.name,
		email: user.email,
		password: user.password
	})
