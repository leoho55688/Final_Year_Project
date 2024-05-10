import { useState } from 'react'
import { ChapterInCreate } from '../types'
import { useParams, useNavigate } from 'react-router-dom'
import TextareaAutosize from 'react-textarea-autosize'
import 'ldrs/dotSpinner'

import { createChapter } from '../api/chapter'

const NewChapter = () => {
	const param = useParams()
	const [count, setCount] = useState<number>(0)
	const [loading, setLoading] = useState<Boolean>(false)
	const [chapter, setChapter] = useState<ChapterInCreate>({
		name: '',
		content: ''
	})
	const [error, setError] = useState('')
	const { name, content } = chapter
	const navigate = useNavigate()

	const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target
		setChapter({
			...chapter,
			[name]: value
		})
	}

	const onTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		const { name, value } = event.target
		setChapter({
			...chapter,
			[name]: value
		})
		setCount(event.target.value.trim().split(' ').length)
	}

	const onCreate = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		window.scrollTo({ top: 0, left: 0 })
		if (count > 18000) {
			setError('Too many words.')
			return
		}
		if (param.courseID) {
			try {
				setLoading(true)
				await createChapter(
					{
						name: name,
						content: content
					},
					param.courseID
				)
				setLoading(false)
				navigate(`/course/${param.courseID}`, { replace: true })
			} catch (e: any) {
				const errorMessage = e.response.data.errors
				setError(errorMessage)
			}
		}
	}

	return (
		<div className='bg-cyan-50 text-gray-800 flex min-h-[88vh] w-full flex-col justify-center px-6 py-12 lg:px-8'>
			<div className='w-full'>
				<h1 className='mb-5 text-center text-4xl font-bold leading-9 tracking-tight '>
					{loading ? 'Loading' : 'Add New Chapter (No more than 5000 words)'}
				</h1>
			</div>

			{error && <div>{error}</div>}
			{loading && (
				<div className='flex justify-center m-5'>
					<l-dot-spinner
						size={50}
						color='teal'
					/>
				</div>
			)}
			{count !== 0 && (
				<div className=' text-center'>
					<p>word count: {count}</p>
				</div>
			)}

			<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-2xl'>
				<form
					className='space-y-6'
					onSubmit={(event) => onCreate(event)}
				>
					<div>
						<label className='block text-sm font-medium leading-6 '>
							Chapter Name
						</label>
						<div className='mt-2'>
							<input
								id='name'
								name='name'
								type='text'
								autoComplete='name'
								onChange={(event) => onInputChange(event)}
								required
								className='block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
							/>
						</div>
					</div>

					<div>
						<div className='flex items-center justify-between'>
							<label className='block text-sm font-medium leading-6 '>
								Chapter Content
							</label>
						</div>
						<div className='mt-2'>
							<TextareaAutosize
								id='content'
								name='content'
								autoComplete='cotent'
								onChange={(event) => onTextareaChange(event)}
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
							Add
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default NewChapter
