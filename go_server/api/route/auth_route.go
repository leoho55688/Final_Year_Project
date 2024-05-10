package route

import (
	"time"

	"backend/api/controller/auth"
	"backend/bootstrap"
	"backend/model/domain"
	"backend/mongo"
	"backend/repository"
	"backend/usecase"

	"github.com/labstack/echo/v4"
)

func InitAuthRouter(env *bootstrap.Env, timeout time.Duration, db mongo.Database, router *echo.Group) {
	authRouter := router.Group("/auth")

	NewSignupRouter(env, timeout, db, authRouter)
	NewLoginRouter(env, timeout, db, authRouter)
}

func NewSignupRouter(env *bootstrap.Env, timeout time.Duration, db mongo.Database, group *echo.Group) {
	ur := repository.NewUserRepository(db, domain.CollectionUser)
	sc := auth.SignupController{
		SignupUsecase: usecase.NewSignupUsecase(ur, timeout),
		Env:           env,
	}
	group.POST("/signup", sc.Signup)
}

func NewLoginRouter(env *bootstrap.Env, timeout time.Duration, db mongo.Database, group *echo.Group) {
	ur := repository.NewUserRepository(db, domain.CollectionUser)

	lc := &auth.LoginController{
		LoginUsecase: usecase.NewLoginUsecase(ur, timeout),
		Env:          env,
	}
	group.POST("/login", lc.Login)
}
