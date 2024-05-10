import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faGooglePlusG,
	faFacebookF,
	faGithub,
	faLinkedinIn
} from '@fortawesome/free-brands-svg-icons'

import { apiUserLogin, apiUserRegister } from '../api/auth'
import { isLoggedInAtom } from '../atom'

const Auth = () => {
	const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInAtom)
	const navigate = useNavigate()

	const [isLogin, setIsLogin] = useState(true)
	const [signInInfo, setSignInInfo] = useState({
		email: '',
		password: ''
	})
	const [signUpInfo, setSignUpInfo] = useState({
		username: '',
		email: '',
		password: ''
	})
	const [error, setError] = useState({
		email: '',
		username: '',
		password: '',
		emailOrPassword: ''
	})

	const onSignInChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target
		setSignInInfo({
			...signInInfo,
			[name]: value
		})
	}
	const onSignUpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target
		setSignUpInfo({
			...signUpInfo,
			[name]: value
		})
	}

	const onToggle = () => {
		setIsLogin(!isLogin)
	}

	const onGetAuth = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (isLogin) {
			try {
				const { data } = await apiUserLogin({
					email: signInInfo.email,
					password: signInInfo.password
				})
				console.log(data)
				localStorage.setItem('jwtToken', data.accessToken)
				localStorage.setItem('refreshToken', data.refreshToken)
				setIsLoggedIn(true)
				navigate('/', { replace: true })
			} catch (e: any) {
				const errorMessage = e.response.data.errors
				setError({
					email: errorMessage.email,
					username: errorMessage.username,
					password: errorMessage.password,
					emailOrPassword: errorMessage['email or password']
				})
			}
		} else {
			try {
				const { data } = await apiUserRegister({
					name: signUpInfo.username,
					email: signUpInfo.email,
					password: signUpInfo.password
				})
				localStorage.setItem('jwtToken', data.accessToken)
				localStorage.setItem('refreshToken', data.refreshToken)
				setIsLoggedIn(true)
				navigate('/', { replace: true })
			} catch (e: any) {
				const errorMessage = e.response.data.errors
				setError({
					email: errorMessage.email,
					username: errorMessage.username,
					password: errorMessage.password,
					emailOrPassword: errorMessage['email or password']
				})
			}
		}
	}

	return (
		<div className='h-[88vh] bg-cyan-50 flex flex-col items-center justify-center'>
			<div className='bg-white rounded-3xl shadow-lg relative overflow-hidden w-[768px] max-w-full min-h-[480px]'>
				<div
					className={
						isLogin
							? 'sign-up absolute top-0 h-full transition-all ease-in-out duration-700 left-0 w-1/2 opacity-0 z-10'
							: 'sign-up absolute top-0 h-full transition-all ease-in-out duration-700 left-0 w-1/2 opacity-100 z-50 translate-x-[100%] animate-[move_0.6s]'
					}
				>
					<form
						className='bg-white flex items-center justify-center flex-col px-10 h-full'
						onSubmit={(event) => onGetAuth(event)}
					>
						<h1 className='text-3xl font-bold'>Create Account</h1>
						<div className='my-5'>
							<a
								href='/auth'
								className='text-slate-700 text-xs mt-3.5 mb-2.5 border-2 border-solid border-slate-500 rounded-[20%] inline-flex items-center justify-center mx-1 w-8 h-8'
							>
								<FontAwesomeIcon icon={faGooglePlusG} />
							</a>
							<a
								href='/auth'
								className='text-slate-700 text-xs mt-3.5 mb-2.5 border-2 border-solid border-slate-500 rounded-[20%] inline-flex items-center justify-center mx-1 w-8 h-8'
							>
								<FontAwesomeIcon icon={faFacebookF} />
							</a>
							<a
								href='/auth'
								className='text-slate-700 text-xs mt-3.5 mb-2.5 border-2 border-solid border-slate-500 rounded-[20%] inline-flex items-center justify-center mx-1 w-8 h-8'
							>
								<FontAwesomeIcon icon={faGithub} />
							</a>
							<a
								href='/auth'
								className='text-slate-700 text-xs mt-3.5 mb-2.5 border-2 border-solid border-slate-500 rounded-[20%] inline-flex items-center justify-center mx-1 w-8 h-8'
							>
								<FontAwesomeIcon icon={faLinkedinIn} />
							</a>
						</div>
						<span className='text-xs'>or use your email for registration</span>
						<input
							className='bg-slate-300 border-none my-2 py-2.5 px-4 text-xs rounded-lg w-full outline-none'
							name='username'
							type='text'
							placeholder='Name'
							onChange={onSignUpChange}
						/>
						<input
							className='bg-slate-300 border-none my-2 py-2.5 px-4 text-xs rounded-lg w-full outline-none'
							name='email'
							type='email'
							placeholder='Email'
							onChange={onSignUpChange}
						/>
						<input
							className='bg-slate-300 border-none my-2 py-2.5 px-4 text-xs rounded-lg w-full outline-none'
							name='password'
							type='password'
							placeholder='Password'
							onChange={onSignUpChange}
						/>
						<button className='bg-cyan-800 text-white text-xs py-2.5 px-11 border-2 border-solid border-transparent rounded-lg font-extrabold tracking-widest uppercase mt-2.5 cursor-pointer'>
							Sign Up
						</button>
					</form>
				</div>
				<div
					className={
						isLogin
							? 'sign-in absolute top-0 h-full transition-all ease-in-out duration-700 left-0 w-1/2 z-20'
							: 'sign-in absolute top-0 h-full transition-all ease-in-out duration-700 left-0 w-1/2 z-20 translate-x-[100%]'
					}
				>
					<form
						className='bg-white flex items-center justify-center flex-col px-10 h-full'
						onSubmit={(event) => onGetAuth(event)}
					>
						<h1 className='text-3xl font-bold'>Sign In</h1>
						<div className='my-5'>
							<a
								href='/auth'
								className='text-slate-700 text-xs mt-3.5 mb-2.5 border-2 border-solid border-slate-500 rounded-[20%] inline-flex items-center justify-center mx-1 w-8 h-8'
							>
								<FontAwesomeIcon icon={faGooglePlusG} />
							</a>
							<a
								href='/auth'
								className='text-slate-700 text-xs mt-3.5 mb-2.5 border-2 border-solid border-slate-500 rounded-[20%] inline-flex items-center justify-center mx-1 w-8 h-8'
							>
								<FontAwesomeIcon icon={faFacebookF} />
							</a>
							<a
								href='/auth'
								className='text-slate-700 text-xs mt-3.5 mb-2.5 border-2 border-solid border-slate-500 rounded-[20%] inline-flex items-center justify-center mx-1 w-8 h-8'
							>
								<FontAwesomeIcon icon={faGithub} />
							</a>
							<a
								href='/auth'
								className='text-slate-700 text-xs mt-3.5 mb-2.5 border-2 border-solid border-slate-500 rounded-[20%] inline-flex items-center justify-center mx-1 w-8 h-8'
							>
								<FontAwesomeIcon icon={faLinkedinIn} />
							</a>
						</div>
						<span className='text-xs'>or use your email password</span>
						<input
							className='bg-slate-300 border-none my-2 py-2.5 px-4 text-xs rounded-lg w-full outline-none'
							name='email'
							type='email'
							placeholder='Email'
							onChange={onSignInChange}
						/>
						<input
							className='bg-slate-300 border-none my-2 py-2.5 px-4 text-xs rounded-lg w-full outline-none'
							name='password'
							type='password'
							placeholder='Password'
							onChange={onSignInChange}
						/>
						<a
							href='/auth'
							className='text-slate-700 text-xs mt-3.5 mb-2.5 mx-0.5'
						>
							Forget Your Password?
						</a>
						<button className='bg-cyan-800 text-white text-xs py-2.5 px-11 border-2 border-solid border-transparent rounded-lg font-extrabold tracking-widest uppercase mt-2.5 cursor-pointer'>
							Sign In
						</button>
					</form>
				</div>
				<div
					className={
						isLogin
							? 'absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-all ease-in-out duration-700 rounded-tl-[150px] rounded-bl-[100px] z-[100]'
							: 'absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-all ease-in-out duration-700 translate-x-[-100%] rounded-tr-[150px] rounded-br-[100px] z-[100]'
					}
				>
					<div className='bg-cyan-600 h-full w-[200%] text-white relative -left-full translate-x-0 transition-all ease-in-out duration-700'>
						<div
							className={
								isLogin
									? 'absolute w-1/2 h-full flex items-center justify-center flex-col px-[30px] text-center top-0 translate-x-[-200%] transition-all ease-in-out duration-700'
									: 'absolute w-1/2 h-full flex items-center justify-center flex-col px-[30px] text-center top-0 translate-x-[100%] transition-all ease-in-out duration-700'
							}
						>
							<h1 className='text-3xl font-bold'>Welcome Back!</h1>
							<p className='text-sm tracking-wider my-5'>
								Enter your personal details to use all of site features
							</p>
							<button
								className='bg-transparent text-white text-xs py-2.5 px-11 border-2 border-solid border-white rounded-lg font-extrabold tracking-widest uppercase mt-2.5 cursor-pointer'
								onClick={onToggle}
							>
								Sign In
							</button>
						</div>
						<div
							className={
								isLogin
									? 'absolute w-1/2 h-full flex items-center justify-center flex-col px-[30px] text-center top-0 right-0 translate-x-0 transition-all ease-in-out duration-700'
									: 'absolute w-1/2 h-full flex items-center justify-center flex-col px-[30px] text-center top-0 right-0 translate-x-[200%] transition-all ease-in-out duration-700'
							}
						>
							<h1 className='text-3xl font-bold'>Hello, Friend!</h1>
							<p className='text-sm tracking-wider my-5'>
								Register with your personal details to use all of site features
							</p>
							<button
								className='bg-transparent text-white text-xs py-2.5 px-11 border-2 border-solid border-white rounded-lg font-extrabold tracking-widest uppercase mt-2.5 cursor-pointer'
								onClick={onToggle}
							>
								Sign Up
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Auth
