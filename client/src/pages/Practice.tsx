import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { getTests } from '../api/practice'
import { Test } from '../types'

const Practice = () => {
	const [tests, setTests] = useState<Test[]>([])
	const navigate = useNavigate()

	useEffect(() => {
		const hasToken = !!localStorage.getItem('jwtToken')
		if (!hasToken) {
			navigate('/', { replace: true })
			return
		}

		const controller = new AbortController()
		const { signal } = controller

		const initTests = async () => {
			try {
				const tests = await getTests(signal)
				setTests(tests)
			} catch (e) {
				throw e
			}
		}

		initTests()
	}, [])

	return (
		<div className='min-h-[88vh] bg-cyan-50 flex flex-col items-center'>
			{tests &&
				tests.map((test) => (
					<div
						key={test.id}
						className='bg-cyan-100 border-2 border-cyan-800 text-gray-800 h-40 w-1/3 rounded-lg m-5'
					>
						<h1 className='text-2xl sm:text:lg h-3/5 p-5'>
							<a href={`/practice/${test.id}`}>{test.courseCode}</a>
						</h1>
						<div className='flex flex-col'>
							<div className='flex px-5'>
								<p className='min-w-1/5 w-40'>No. of Questions:</p>
								<p>{test.questionNumber}</p>
							</div>
							{/* <div className='flex px-5'>
								<p className='min-w-1/5 w-40'>Previous Result:</p>
								<p>{test.previousResult}</p>
							</div> */}
						</div>
					</div>
				))}
			<div className='border-2 border-dashed border-gray-600 h-40 w-1/3 rounded-lg m-5'>
				<h1 className='text-xl text-gray-600 h-3/5 p-5'>Add Practice Test</h1>
				<div className='flex items-center justify-center text-gray-600 text-4xl'>
					<a href={'/new-practice'}>+</a>
				</div>
			</div>
		</div>
	)
}

export default Practice
