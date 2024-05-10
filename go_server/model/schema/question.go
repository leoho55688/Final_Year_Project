package schema

type QuestionCreateRequest struct {
	Question      string   `json:"question"`
	Answers       []string `json:"answers"`
	CorrectAnswer string   `json:"correct_answer"`
	Explanation   string   `json:"explanation"`
}

type QuestionCreateResponse struct {
	QID string `json:"questionID"`
}
