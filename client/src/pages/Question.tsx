import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import TextareaAutosize from 'react-textarea-autosize'

import { getExplainSource } from '../api/question'

const Question = () => {
	const [question, setQuestion] = useState<string>('')
	const [explanation, setExplanation] = useState<string>('')
	const [isExplained, setIsExplained] = useState<Boolean>(false)
	const param = useParams()
	const navigate = useNavigate()

	useEffect(() => {
		const hasToken = !!localStorage.getItem('jwtToken')
		if (!hasToken) {
			navigate('/', { replace: true })
			return
		}
	}, [])

	const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
		setQuestion(event.target.value)
	}

	const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (param.courseID) {
			try {
				const data = await getExplainSource({
					question: question
				})
				setExplanation(data.explanation)
				setIsExplained(true)
			} catch (e) {
				throw e
			}
		}
	}

	return (
		<div className='min-h-[88vh] bg-cyan-50 flex flex-col items-center justify-start px-6 py-12 lg:px-8'>
			{!isExplained && (
				<div className='w-3/4 flex flex-col items-center'>
					<h1 className='m-5'>Please Enter Your Question</h1>
					<form
						className='w-1/2'
						onSubmit={(event) => onSubmit(event)}
					>
						<div>
							<div className='m-5'>
								<TextareaAutosize
									onChange={(event) => onChange(event)}
									required
									className='px-2 py-1 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6'
								/>
							</div>
						</div>
						<div className='flex justify-center'>
							<button
								type='submit'
								className='flex w-1/6 justify-center rounded-md bg-cyan-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600'
							>
								Enter
							</button>
						</div>
					</form>
				</div>
			)}

			{isExplained && (
				<div className='w-full flex flex-col items-center'>
					<h1 className=' text-3xl'>Answer Bot</h1>

					<h2 className='w-3/4  text-2xl text-left m-2'>Explanation:</h2>
					{explanation && (
						<div className='w-3/4 bg-cyan-100 border-2 border-cyan-600 rounded-lg'>
							<p className='whitespace-pre-line text-lg text-left m-3 pr-5 w-full'>
								{explanation}
							</p>
						</div>
					)}
					<button
						onClick={() => setIsExplained(false)}
						className='flex w-1/6 mt-4 justify-center rounded-md bg-cyan-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
					>
						Ask Next Question
					</button>
				</div>
			)}
		</div>
	)
}

export default Question
