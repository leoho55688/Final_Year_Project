export interface UserInLogin {
	email: string
	password: string
}

export interface UserInRegister extends UserInLogin {
	name: string
}

export interface AuthResponse {
	accessToken: string
	refreshToken: string
}

export interface CourseInCreate {
	name: string
	code: string
}

export interface Course extends CourseInCreate {
	id: string
	uid: string
	chapters: string[]
}

export interface ChapterInCreate {
	name: string
	content: string
}

export interface Chapter {
	id: string
	cid: string
	name: string
	content: string[]
}

export interface Chunk {
	title: string
	content: string
}

export interface TestInCreate {
	cid: string
	courseCode: string
	questionNumber: number
}

export interface Test extends TestInCreate {
	id: string
	uid: string
	previousResult: number
}

export interface MCQuestion {
	id: string
	tid: string
	question: string
	answers: string[]
	correctAnswer: string
	previousAnswer: boolean
	explanation: string
}
