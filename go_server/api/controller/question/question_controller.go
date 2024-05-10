package question

import (
	"backend/bootstrap"
	"backend/model/domain"
	"backend/model/schema"
	"net/http"

	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"google.golang.org/appengine"
)

type QuestionController struct {
	QuestionUsecase domain.QuestionUsecase
	Env             *bootstrap.Env
}

func (qc *QuestionController) Create(c echo.Context) error {
	ctx := appengine.NewContext(c.Request())
	testID := c.Param("tid")

	var request schema.QuestionCreateRequest
	err := c.Bind(&request)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, schema.ErrorResponse{Message: err.Error()})
	}

	question := domain.MCQuestion{
		ID:             primitive.NewObjectID(),
		TID:            testID,
		Question:       request.Question,
		Answers:        request.Answers,
		CorrectAnswer:  request.CorrectAnswer,
		PreviousAnswer: false,
		Explanation:    request.Explanation,
	}

	err = qc.QuestionUsecase.Create(ctx, &question)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, schema.ErrorResponse{Message: err.Error()})
	}

	questionCreateResponse := schema.QuestionCreateResponse{
		QID: question.ID.String(),
	}
	return c.JSON(http.StatusOK, questionCreateResponse)
}

func (qc *QuestionController) Fetch(c echo.Context) error {
	ctx := appengine.NewContext(c.Request())
	testID := c.Param("tid")

	tests, err := qc.QuestionUsecase.GetByTID(ctx, testID)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, schema.ErrorResponse{Message: err.Error()})
	}

	return c.JSON(http.StatusOK, tests)
}
