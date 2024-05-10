import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { getChapters } from '../api/chapter'
import { Chapter } from '../types'

const Course = () => {
	const [chapters, setChapters] = useState<Chapter[]>([])
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

		const initChapters = async () => {
			if (param.courseID) {
				try {
					const chapters = await getChapters(param.courseID, signal)
					setChapters(chapters)
				} catch (e) {
					throw e
				}
			}
		}

		initChapters()
	}, [])

	return (
		<div className='min-h-[88vh] bg-cyan-50 flex flex-col items-center'>
			<div className='bg-cyan-600 border-2 border-white rounded-lg h-20 w-1/3 text-center text-lg text-white font-bold p-6 m-10'>
				<a href={`/question/${param.courseID}`}>Ask Question</a>
			</div>
			{chapters &&
				chapters.map((chapter) => (
					<div
						key={chapter.id}
						className='bg-cyan-100 border-2 border-cyan-800 text-gray-800 h-40 w-1/2 rounded-lg m-5'
					>
						<h1 className='text-2xl h-3/5 p-5'>
							<a href={`/course/${param.courseID}/${chapter.name}`}>
								{chapter.name}
							</a>
						</h1>
						{chapter.content && (
							<p className='mx-5 my-3'>Content Preview: {chapter.content[0]}</p>
						)}
					</div>
				))}
			<div className='border-2 border-dashed border-gray-600 h-40 w-1/3 rounded-lg m-5'>
				<h1 className='text-xl text-gray-600 h-3/5 p-5'>Add Chapter</h1>
				<div className='flex items-center justify-center text-gray-600 text-4xl'>
					<a href={'/new-chapter/' + param.courseID}>+</a>
				</div>
			</div>
		</div>
	)
}

export default Course
