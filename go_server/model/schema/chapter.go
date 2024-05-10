package schema

type ChapterCreateRequest struct {
	Name    string `form:"name" binding:"required"`
	Content string `form:"content" binding:"required"`
}

type ChapterCreateResponse struct {
	CHID string `json:"chapterID"`
}
