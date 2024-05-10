import { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import 'ldrs/dotSpinner'

import { createPracticeQuestion, createTest } from '../api/practice'

const NewPractice = () => {
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState(false)
	const [selectedOption, setSelectedOption] = useState('')
	const [questionNumber, setQuestionNumber] = useState('')
	const [courses, setCourses] = useState<
		{ id: string; code: string; chapters: string[] }[]
	>([])
	const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

	useEffect(() => {
		const hasToken = !!localStorage.getItem('jwtToken')
		if (!hasToken) {
			navigate('/', { replace: true })
			return
		}

		const coursesLocal = localStorage.getItem('courses')
		if (coursesLocal) {
			setCourses(JSON.parse(coursesLocal))
		}
	}, [])

	const onCourseChange = (event: ChangeEvent<HTMLSelectElement>) => {
		setSelectedOption(event.target.value)
	}
	const onNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value
		if (value === '' || (parseInt(value) >= 1 && parseInt(value) <= 20)) {
			setQuestionNumber(value)
		}
	}
	const onCreate = async () => {
		if (selectedOption === '' || Number(questionNumber) <= 0) {
			alert('Please fill in all column to create a practice test.')
			return
		}
		try {
			setIsLoading(true)
			const questionNum = Number(questionNumber)
			const selectedCourse = courses.filter(
				(course) => course.id == selectedOption
			)[0]

			const res = await createTest({
				cid: selectedOption,
				courseCode: selectedCourse.code,
				questionNumber: questionNum
			})

			const testID = res.testID.match(/ObjectID\("(\w+)"\)/)[1]
			for (let i = 0; i < questionNum; i++) {
				const data = {
					context:
						selectedCourse.chapters[
							Math.floor(Math.random() * selectedCourse.chapters.length)
						],
					tid: testID
				}
				const res = await createPracticeQuestion(data)
				await delay(20 * 1000)

				if (!res.success) {
					i--
				}
			}

			setIsLoading(false)
			navigate('/practice', { replace: true })
		} catch (e: any) {
			throw e
		}
	}

	return (
		<div className='min-h-[88vh] bg-cyan-50 flex flex-col items-center'>
			{isLoading && (
				<>
					<h1 className='mt-60 mb-5 text-center text-3xl font-bold leading-9 tracking-tight'>
						Loading ...
					</h1>
					<div className='mt-5'>
						<l-dot-spinner
							size={50}
							color='teal'
						/>
					</div>
				</>
			)}

			{!isLoading && (
				<>
					<h1 className='mt-20 mb-5 text-center text-3xl font-bold leading-9 tracking-tight'>
						Create New Practice Test
					</h1>
					<h2 className='text-xl mb-10'>(20 questions at most)</h2>
					<div className='flex flex-col text-lg items-center'>
						<div>
							<div className='flex justify-between m-5'>
								<p>Select Course:&emsp;</p>
								<select
									value={selectedOption}
									onChange={(event) => onCourseChange(event)}
									className='p-2 text-sm outline outline-2 outline-cyan-600 rounded-lg'
								>
									<option value=''>Select an option</option>
									{courses.map((option, index) => (
										<option
											key={index}
											value={option.id}
										>
											{option.code}
										</option>
									))}
								</select>
							</div>
							<div className='flex justify-between m-5'>
								<p>Select Number of Questions:&emsp;</p>
								<input
									type='number'
									value={questionNumber}
									onChange={(event) => onNumberChange(event)}
									min='1'
									max='20'
									className='p-1 text-sm outline outline-2 outline-cyan-600 rounded-md'
								/>
							</div>
						</div>
						<button
							className='text-base text-white bg-cyan-800 rounded-lg h-10 w-20 m-5'
							onClick={onCreate}
						>
							Create
						</button>
					</div>
				</>
			)}
		</div>
	)
}

export default NewPractice
