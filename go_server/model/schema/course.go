package schema

type CourseCreateRequest struct {
	Name string `form:"name" binding:"required"`
	Code string `form:"code" binding:"required"`
}

type CourseCreateResponse struct {
	CID string `json:"courseID"`
}
