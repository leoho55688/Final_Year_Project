package route

import (
	"time"

	"backend/bootstrap"
	"backend/model/schema"
	"backend/mongo"

	"github.com/golang-jwt/jwt/v5"
	echojwt "github.com/labstack/echo-jwt/v4"
	"github.com/labstack/echo/v4"
)

func Setup(env *bootstrap.Env, timeout time.Duration, db mongo.Database, e *echo.Echo) {
	// Initial Public Router
	publicRouter := e.Group("/api")

	// Initial Routers
	InitAuthRouter(env, timeout, db, publicRouter)

	// Initial Protected Router
	config := echojwt.Config{
		NewClaimsFunc: func(c echo.Context) jwt.Claims {
			return new(schema.JwtCustomClaims)
		},
		SigningKey: []byte(env.AccessTokenSecret),
	}
	protectedRouter := e.Group("/api")
	protectedRouter.Use(echojwt.WithConfig(config))

	// Initial Routers
	InitUserRouter(env, timeout, db, protectedRouter)
	InitCourseRouter(env, timeout, db, protectedRouter)
	InitPracticeRouter(env, timeout, db, protectedRouter)
	// InitGenAIRouter(env, timeout, db, genai, protectedRouter)
}
