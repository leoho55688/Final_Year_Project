import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { getCourses } from '../api/course'
import { Course } from '../types'

const Courses = () => {
	const [courses, setCourses] = useState<Course[]>([])
	const navigate = useNavigate()

	useEffect(() => {
		const hasToken = !!localStorage.getItem('jwtToken')
		if (!hasToken) {
			navigate('/', { replace: true })
			return
		}

		const controller = new AbortController()
		const { signal } = controller

		const initCourses = async () => {
			try {
				const courses = await getCourses(signal)
				setCourses(courses)
				if (courses) {
					const courseCodes = courses.map((course: Course) => {
						return {
							id: course.id,
							code: course.code,
							chapters: course.chapters
						}
					})
					localStorage.setItem('courses', JSON.stringify(courseCodes))
				}
			} catch (e) {
				throw e
			}
		}

		initCourses()
	}, [])

	return (
		<div className='h-[88vh] bg-cyan-50 min-h-full flex flex-wrap content-start'>
			{courses &&
				courses.map((course) => (
					<div
						key={course.id}
						className='text-sm m-10 flex-grow p-5 bg-cyan-100 h-40 w-1/4 max-w-[400px] min-w-[350px] rounded-xl flex flex-col justify-evenly border-2 border-cyan-800'
					>
						<div className='flex'>
							<p className='w-2/5'>Course Name:</p>
							<a
								href={'/course/' + course.id}
								className='w-3/5'
							>
								{course.name}
							</a>
						</div>
						<div className='flex'>
							<p className='w-2/5'>Course Code: </p>
							<p className='w-3/5'>{course.code}</p>
						</div>
						<div className='flex'>
							<p className='w-2/5'>No. of Chapters: </p>
							<p className='w-3/5'>
								{course.chapters ? course.chapters.length : 0}
							</p>
						</div>
					</div>
				))}
			<div className='text-lg m-10 flex-grow p-5 border-2 border-dashed border-gray-600 text-gray-600 h-40 w-1/4 max-w-[400px] min-w-[250px] rounded-xl flex flex-col justify-center items-center'>
				Create New Course
				<a
					href='/new-course'
					className='m-2 text-2xl'
				>
					+
				</a>
			</div>
		</div>
	)
}

export default Courses
