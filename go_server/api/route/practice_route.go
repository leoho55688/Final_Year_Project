package route

import (
	"time"

	"backend/api/controller/practice"
	"backend/api/controller/question"
	"backend/bootstrap"
	"backend/model/domain"
	"backend/mongo"
	"backend/repository"
	"backend/usecase"

	"github.com/labstack/echo/v4"
)

func InitPracticeRouter(env *bootstrap.Env, timeout time.Duration, db mongo.Database, router *echo.Group) {
	practiceRouter := router.Group("/practice")

	NewPracticeRouter(env, timeout, db, practiceRouter)
}

func NewPracticeRouter(env *bootstrap.Env, timeout time.Duration, db mongo.Database, router *echo.Group) {
	tr := repository.NewTestRepository(db, domain.CollectionTest)
	tc := &practice.TestController{
		TestUsecase: usecase.NewTestUsecase(tr, timeout),
	}

	qr := repository.NewQuestionRepository(db, domain.CollectionQuestion)
	qc := &question.QuestionController{
		QuestionUsecase: usecase.NewQuestionUsecase(qr, timeout),
	}

	router.GET("", tc.Fetch)
	router.POST("", tc.Create)
	router.GET("/:tid", qc.Fetch)
	router.POST("/:tid", qc.Create)
}
