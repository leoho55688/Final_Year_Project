import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RecoilRoot, useSetRecoilState } from 'recoil'

import Header from './components/header/Header'
import Footer from './components/footer/Footer'

import Home from './pages/Home'
import Auth from './pages/Auth'
import SingleChapter from './pages/Chapter'
import Course from './pages/Course'
import Courses from './pages/Courses'
import NewChapter from './pages/NewChapter'
import NewCourse from './pages/NewCourse'
import NewPractice from './pages/NewPractice'
import Practice from './pages/Practice'
import PracticeQuestion from './pages/PracticeQuestion'
import Profile from './pages/Profile'
import Question from './pages/Question'

import NotFound from './pages/404'

import { isLoggedInAtom } from './atom'

function App() {
	const [loading, setLoading] = useState(true)
	const setIsLoggedIn = useSetRecoilState(isLoggedInAtom)

	useEffect(() => {
		const initApp = async () => {
			const hasToken = !!localStorage.getItem('jwtToken')
			if (!hasToken) return
			try {
				setIsLoggedIn(true)
			} catch (e: any) {
				console.log(e)
				localStorage.removeItem('jwtToken')
				setIsLoggedIn(false)
			}
		}

		initApp().then(() => setLoading(false))
	}, [setIsLoggedIn])

	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path='/'>
					<Route
						index
						element={<Home />}
					/>
					<Route
						path='auth'
						element={<Auth />}
					/>
					<Route
						path='course'
						element={<Courses />}
					/>
					<Route
						path='course/:courseID'
						element={<Course />}
					/>
					<Route
						path='new-course'
						element={<NewCourse />}
					/>
					<Route
						path='course/:courseID/:chapterID'
						element={<SingleChapter />}
					/>
					<Route
						path='new-chapter/:courseID'
						element={<NewChapter />}
					/>
					<Route
						path='question/:courseID'
						element={<Question />}
					/>
					<Route
						path='profile'
						element={<Profile />}
					/>
					<Route
						path='practice'
						element={<Practice />}
					/>
					<Route
						path='practice/:testID'
						element={<PracticeQuestion />}
					/>
					<Route
						path='new-practice'
						element={<NewPractice />}
					/>
					<Route
						path='*'
						element={<NotFound />}
					/>
				</Route>
			</Routes>
			<Footer />
		</BrowserRouter>
	)
}

export default App
