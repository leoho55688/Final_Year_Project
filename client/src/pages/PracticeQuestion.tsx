import { ChangeEvent, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { getPracticeQuestions } from '../api/practice'
import { MCQuestion } from '../types'

const PracticeQuestion = () => {
	const [questions, setQuestions] = useState<MCQuestion[]>([])
	const [answers, setAnswers] = useState<string[]>([])
	const [submitted, setSubmitted] = useState(false)
	const param = useParams()
	const navigate = useNavigate()

	useEffect(() => {
		const hasToken = !!localStorage.getItem('jwtToken')
		if (!hasToken) {
			navigate('/', { replace: true })
			return
		}

		const controller = new AbortController()
		const { signal } = controller

		const initTestQuestions = async () => {
			if (param.testID) {
				try {
					const testQuestions = await getPracticeQuestions(param.testID, signal)
					setQuestions(testQuestions)
					if (!testQuestions) {
						navigate('/practice', { replace: true })
						alert("The test doesn't contain any questions.")
					}
				} catch (e) {
					throw e
				}
			}
		}

		initTestQuestions()
	}, [])
	useEffect(() => {
		setAnswers(new Array(questions.length).fill(''))
	}, [questions])

	const onAnswerChange = (
		event: ChangeEvent<HTMLInputElement>,
		index: number
	) => {
		const newAnswers = [
			...answers.slice(0, index),
			event.target.value,
			...answers.slice(index + 1)
		]
		setAnswers(newAnswers)
	}

	const onSubmit = () => {
		if (answers.includes('')) {
			alert('Please answer all questions before submitting.')
			return
		}
		setSubmitted(true)
		const results = answers.map((answer, index) => {
			return {
				id: questions[index].id,
				previousAnswer: answer.includes(questions[index].correctAnswer)
			}
		})
		const correctQuestions = results.filter((result) => result.previousAnswer)
		const wrongQuestions = results.filter((result) => !result.previousAnswer)
		const score = correctQuestions.length
	}

	return (
		<div className='min-h-[88vh] bg-cyan-50 flex flex-col items-center content-start'>
			{!submitted && (
				<>
					{questions &&
						questions.map((question, index) => (
							<div className='m-5 w-1/2'>
								<p className='text-lg mb-5'>
									{index + 1 + '.'}&emsp;
									{question.question}
								</p>
								{question.answers.map((answer) => (
									<div className='flex justify-between p-1'>
										<p>{answer}</p>
										<input
											type='radio'
											name={question.id}
											value={answer}
											onChange={(event) => onAnswerChange(event, index)}
										/>
									</div>
								))}
							</div>
						))}
					<button
						className='bg-cyan-800 hover:bg-cyan-700 text-white py-2 px-5 rounded-lg m-5'
						onClick={onSubmit}
					>
						Submit
					</button>
				</>
			)}
			{submitted && (
				<>
					{questions &&
						questions.map((question, index) => (
							<div className='m-5 w-2/3'>
								<p className='text-lg'>
									{index + 1 + '.'}&emsp;{question.question}
								</p>
								<div className='flex flex-col'>
									<div className='flex m-1'>
										<p
											className={
												answers[index].includes(question.correctAnswer)
													? 'text-green-600'
													: 'text-red-600'
											}
										>
											Your answer:&emsp;&emsp;&ensp;
										</p>
										<p
											className={
												answers[index].includes(question.correctAnswer)
													? 'text-green-600'
													: 'text-red-600'
											}
										>
											{answers[index]}
										</p>
									</div>
									<div className='flex m-1'>
										<p>Correct answer:&emsp;</p>
										<p>{question.correctAnswer}</p>
									</div>
									<div className='flex m-1'>
										<p>Explanation:&emsp;&emsp;&ensp;</p>
										<div className='whitespace-pre-line	'>
											{question.explanation}
										</div>
									</div>
								</div>
							</div>
						))}
					<button
						className='bg-cyan-800 hover:bg-cyan-700 text-white px-5 py-2 rounded-lg m-5'
						onClick={() => {
							setSubmitted(false)
						}}
					>
						Retry
					</button>
				</>
			)}
		</div>
	)
}

export default PracticeQuestion
