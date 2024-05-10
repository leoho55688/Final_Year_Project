package schema

type TestCreateRequest struct {
	CID            string `form:"cid" binding:"required"`
	CourseCode     string `form:"courseCode" binding:"required"`
	QuestionNumber int    `form:"questionNumber" binding:"required"`
}

type TestCreateResponse struct {
	TID string `json:"testID"`
}
