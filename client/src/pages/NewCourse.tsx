import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { createCourses } from '../api/course'
import { CourseInCreate } from '../types'

const NewCourse = () => {
	const [course, setCourse] = useState<CourseInCreate>({
		name: '',
		code: ''
	})
	const [error, setError] = useState('')
	const { name, code } = course
	const navigate = useNavigate()

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target
		setCourse({
			...course,
			[name]: value
		})
	}

	const onCreate = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		try {
			await createCourses({
				name: name,
				code: code
			})
			navigate('/course', { replace: true })
		} catch (e: any) {
			const errorMessage = e.response.data.errors
			setError(errorMessage)
		}
	}

	return (
		<div className='bg-cyan-50 flex h-[88vh] flex-col justify-center px-6 py-12 lg:px-8'>
			<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
				<h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight '>
					Create New Course
				</h2>
			</div>

			{error && <div>{error}</div>}

			<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
				<form
					className='space-y-6'
					onSubmit={(event) => onCreate(event)}
				>
					<div>
						<label className='block text-sm font-medium leading-6 '>
							Course Name
						</label>
						<div className='mt-2'>
							<input
								id='name'
								name='name'
								type='text'
								autoComplete='name'
								onChange={(event) => onChange(event)}
								required
								className='block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
							/>
						</div>
					</div>

					<div>
						<div className='flex items-center justify-between'>
							<label className='block text-sm font-medium leading-6 '>
								Course Code
							</label>
						</div>
						<div className='mt-2'>
							<input
								id='code'
								name='code'
								type='text'
								autoComplete='code'
								onChange={(event) => onChange(event)}
								required
								className='block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
							/>
						</div>
					</div>

					<div>
						<button
							type='submit'
							className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
						>
							Create
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default NewCourse
