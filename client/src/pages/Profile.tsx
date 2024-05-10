import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
	const navigate = useNavigate()

	useEffect(() => {
		const hasToken = !!localStorage.getItem('jwtToken')
		if (!hasToken) {
			navigate('/', { replace: true })
			return
		}
	}, [])

	return <div className='h-[88vh] bg-cyan-50'>Your Profile</div>
}

export default Profile
