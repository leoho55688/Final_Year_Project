import { Fragment, useEffect } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import {
	AcademicCapIcon,
	Bars3Icon,
	BellIcon,
	UserCircleIcon,
	XMarkIcon
} from '@heroicons/react/24/outline'
import { useRecoilState } from 'recoil'

import { isLoggedInAtom } from '../../atom'

const loginNavigation = [
	{ name: 'Home', href: '/', current: false },
	{ name: 'Course', href: '/course', current: false },
	{ name: 'Practice', href: '/practice', current: false }
]
const logoutNavigation = [
	{ name: 'Home', href: '/', current: false },
	{ name: 'Auth', href: '/auth', current: false }
]

const classNames = (...classes: string[]) => {
	return classes.filter(Boolean).join(' ')
}

const Header = () => {
	const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInAtom)

	const onLogout = () => {
		localStorage.removeItem('jwtToken')
		setIsLoggedIn(false)
	}

	useEffect(() => {}, [isLoggedIn])

	return (
		<Disclosure
			as='nav'
			className='bg-cyan-600'
		>
			{({ open }) => (
				<>
					<div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
						<div className='relative flex h-[8vh] items-center justify-between'>
							<div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
								{/* Mobile menu button*/}
								<Disclosure.Button className='relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-cyan-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
									<span className='absolute -inset-0.5' />
									<span className='sr-only'>Open main menu</span>
									{open ? (
										<XMarkIcon
											className='block h-6 w-6'
											aria-hidden='true'
										/>
									) : (
										<Bars3Icon
											className='block h-6 w-6'
											aria-hidden='true'
										/>
									)}
								</Disclosure.Button>
							</div>
							<div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
								<div className='flex flex-shrink-0 text-white items-center'>
									<AcademicCapIcon
										className='h-6 w-6'
										aria-hidden='true'
									/>
								</div>
								<div className='hidden sm:ml-6 sm:block'>
									<div className='flex space-x-4'>
										{isLoggedIn &&
											loginNavigation.map((item) => (
												<a
													key={item.name}
													href={item.href}
													className={classNames(
														item.current
															? 'bg-cyan-900 text-white'
															: 'text-white hover:bg-cyan-700 hover:text-white',
														'rounded-md px-3 py-2 text-sm font-medium'
													)}
													aria-current={item.current ? 'page' : undefined}
												>
													{item.name}
												</a>
											))}
										{!isLoggedIn &&
											logoutNavigation.map((item) => (
												<a
													key={item.name}
													href={item.href}
													className={classNames(
														item.current
															? 'bg-cyan-900 text-white'
															: 'text-white hover:bg-cyan-700 hover:text-white',
														'rounded-md px-3 py-2 text-sm font-medium'
													)}
													aria-current={item.current ? 'page' : undefined}
												>
													{item.name}
												</a>
											))}
									</div>
								</div>
							</div>
							<div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
								{isLoggedIn && (
									<>
										<button
											type='button'
											className='relative rounded-full bg-cyan-600 p-1 text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-cyan-600'
										>
											<span className='absolute -inset-1.5' />
											<span className='sr-only'>View notifications</span>
											<BellIcon
												className='h-6 w-6'
												aria-hidden='true'
											/>
										</button>

										{/* Profile dropdown */}
										<Menu
											as='div'
											className='relative ml-3'
										>
											<div>
												<Menu.Button className='relative flex rounded-full bg-cyan-600 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-cyan-600'>
													<span className='absolute -inset-1.5' />
													<span className='sr-only'>Open user menu</span>
													<UserCircleIcon
														className='h-6 w-6'
														aria-hidden='true'
													/>
												</Menu.Button>
											</div>
											<Transition
												as={Fragment}
												enter='transition ease-out duration-100'
												enterFrom='transform opacity-0 scale-95'
												enterTo='transform opacity-100 scale-100'
												leave='transition ease-in duration-75'
												leaveFrom='transform opacity-100 scale-100'
												leaveTo='transform opacity-0 scale-95'
											>
												<Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
													<Menu.Item>
														{({ active }) => (
															<a
																href='/profile'
																className={classNames(
																	active ? 'bg-cyan-100' : '',
																	'block px-4 py-2 text-sm text-cyan-700'
																)}
															>
																Your Profile
															</a>
														)}
													</Menu.Item>
													<Menu.Item>
														{({ active }) => (
															<a
																href='/'
																className={classNames(
																	active ? 'bg-cyan-100' : '',
																	'block px-4 py-2 text-sm text-cyan-700'
																)}
															>
																Settings
															</a>
														)}
													</Menu.Item>
													<Menu.Item>
														{({ active }) => (
															<a
																href='/'
																className={classNames(
																	active ? 'bg-cyan-100' : '',
																	'block px-4 py-2 text-sm text-cyan-700'
																)}
																onClick={onLogout}
															>
																Sign out
															</a>
														)}
													</Menu.Item>
												</Menu.Items>
											</Transition>
										</Menu>
									</>
								)}
							</div>
						</div>
					</div>
				</>
			)}
		</Disclosure>
	)
}

export default Header
