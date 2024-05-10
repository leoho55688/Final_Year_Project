import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { Chapter } from '../types'
import { getChapter } from '../api/chapter'

const SingleChapter = () => {
	const [chapter, setChapter] = useState<Chapter>()
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

		const initChapter = async () => {
			if (param.courseID && param.chapterID) {
				try {
					const chapter = await getChapter(
						param.courseID,
						param.chapterID,
						signal
					)
					setChapter(chapter)
					if (!chapter.content) {
						navigate(`/course/${param.courseID}`, { replace: true })
						alert("The chapter doesn't contain any content.")
					}
				} catch (error) {
					throw error
				}
			}
		}

		initChapter()
	}, [])

	return (
		<div className='min-h-[88vh] bg-cyan-50 flex flex-col items-center'>
			<div className='bg-cyan-600 border-2 border-white rounded-lg h-20 w-1/3 text-center text-lg text-white font-bold p-6 m-10'>
				<h1>{chapter?.name}</h1>
			</div>
			<div className='bg-cyan-100 border-2 border-cyan-800 rounded-lg min-h-20 w-1/2 text-lg'>
				<p className='mx-5 my-3 whitespace-pre-line'>{chapter?.content[0]}</p>
			</div>
		</div>
	)
}

export default SingleChapter
