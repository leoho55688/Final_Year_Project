package practice

import (
	"net/http"

	"backend/bootstrap"
	"backend/internal/tokenutil"
	"backend/model/domain"
	"backend/model/schema"

	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"google.golang.org/appengine"
)

type TestController struct {
	TestUsecase     domain.TestUsecase
	QuestionUsecase domain.QuestionUsecase
	Env             *bootstrap.Env
}

func (tc *TestController) Fetch(c echo.Context) error {
	ctx := appengine.NewContext(c.Request())
	userID, err := tokenutil.ExtractIDFromContext(c)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, schema.ErrorResponse{Message: err.Error()})
	}

	tests, err := tc.TestUsecase.GetByUID(ctx, userID)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, schema.ErrorResponse{Message: err.Error()})
	}

	return c.JSON(http.StatusOK, tests)
}

func (tc *TestController) Create(c echo.Context) error {
	ctx := appengine.NewContext(c.Request())
	userID, err := tokenutil.ExtractIDFromContext(c)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, schema.ErrorResponse{Message: err.Error()})
	}

	var request schema.TestCreateRequest
	err = c.Bind(&request)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, schema.ErrorResponse{Message: err.Error()})
	}

	test := domain.Test{
		ID:             primitive.NewObjectID(),
		CID:            request.CID,
		UID:            userID,
		CourseCode:     request.CourseCode,
		QuestionNumber: request.QuestionNumber,
		PreviousResult: 0,
	}

	err = tc.TestUsecase.Create(ctx, &test)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, schema.ErrorResponse{Message: err.Error()})
	}

	// client := genai.NewGenerativeAIClient(tc.GenAIConnection)
	// result, err := client.MultipleChoice(ctx, &genai.MCRequest{Context: "IP TCP SSL Record Protocol SSL Handshake Protocol SSL Change Cipher Spec Protocol SSL Alert Protocol HTTP Figure 5.2 SSL Protocol Stack peer relationships. The connections are transient. Every connection is ed with one session. An SSL session is an association between a client and a server. Sessions ted by the Handshake Protocol. Sessions define a set of cryptographic"})
	// if err != nil {
	// 	log.Fatalf("could not greet: %v", err)
	// }
	// mcQuestion := domain.MCQuestion{
	// 	Question:      result.GetQuestion(),
	// 	Answers:       result.GetAnswers(),
	// 	CorrectAnswer: result.GetCorrectAnswer(),
	// 	Explanation:   result.GetExplanation(),
	// }

	// err = tc.QuestionUsecase.Create(ctx, &mcQuestion)
	// if err != nil {
	// 	return echo.NewHTTPError(http.StatusInternalServerError, schema.ErrorResponse{Message: err.Error()})
	// }

	testCreateResponse := schema.TestCreateResponse{
		TID: test.ID.String(),
	}
	return c.JSON(http.StatusOK, testCreateResponse)
}
