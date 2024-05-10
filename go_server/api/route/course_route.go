package route

import (
	"time"

	"backend/api/controller/course"
	"backend/bootstrap"
	"backend/model/domain"
	"backend/mongo"
	"backend/repository"
	"backend/usecase"

	"github.com/labstack/echo/v4"
)

func InitCourseRouter(env *bootstrap.Env, timeout time.Duration, db mongo.Database, router *echo.Group) {
	courseRouter := router.Group("/course")

	NewCourseRouter(env, timeout, db, courseRouter)
}

func NewCourseRouter(env *bootstrap.Env, timeout time.Duration, db mongo.Database, router *echo.Group) {
	cr := repository.NewCourseRepository(db, domain.CollectionCourse)
	cc := &course.CourseController{
		CourseUsecase: usecase.NewCourseUsecase(cr, timeout),
	}

	chr := repository.NewChapterRepository(db, domain.CollectionChapter)
	chc := &course.ChapterController{
		ChapterUsecase: usecase.NewChapterUsecase(chr, timeout),
	}

	router.GET("", cc.Fetch)
	router.POST("", cc.Create)
	router.GET("/:cid", chc.Fetch)
	router.GET("/:cid/:chapterName", chc.FetchOne)
	router.POST("/:cid", chc.Create)
}
