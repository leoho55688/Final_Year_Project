package course

import (
	"net/http"

	"backend/bootstrap"
	"backend/model/domain"
	"backend/model/schema"

	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"google.golang.org/appengine"
)

type ChapterController struct {
	ChapterUsecase domain.ChapterUsecase
	CourseUsecase  domain.CourseUsecase
	Env            *bootstrap.Env
}

func (chc *ChapterController) Fetch(c echo.Context) error {
	ctx := appengine.NewContext(c.Request())
	chapterID := c.Param("cid")

	chapters, err := chc.ChapterUsecase.GetByCID(ctx, chapterID)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, schema.ErrorResponse{Message: err.Error()})
	}

	return c.JSON(http.StatusOK, chapters)
}

func (chc *ChapterController) FetchOne(c echo.Context) error {
	ctx := appengine.NewContext(c.Request())
	chapterID := c.Param("cid")
	chapterName := c.Param("chapterName")

	contents, err := chc.ChapterUsecase.GetByCIDName(ctx, chapterID, chapterName)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, schema.ErrorResponse{Message: err.Error()})
	}

	return c.JSON(http.StatusOK, contents)
}

func (chc *ChapterController) Create(c echo.Context) error {
	ctx := appengine.NewContext(c.Request())
	var request schema.ChapterCreateRequest

	err := c.Bind(&request)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, schema.ErrorResponse{Message: err.Error()})
	}

	cid := c.Param("cid")

	content := []string{request.Content}

	chapter := domain.Chapter{
		ID:      primitive.NewObjectID(),
		CID:     cid,
		Name:    request.Name,
		Content: content,
	}

	err = chc.ChapterUsecase.Create(ctx, &chapter)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, schema.ErrorResponse{Message: err.Error()})
	}

	chapterInCourse := domain.ChapterUpdateInCourse{
		CID:  cid,
		Name: request.Name,
	}
	err = chc.CourseUsecase.InsertChapter(ctx, &chapterInCourse)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, schema.ErrorResponse{Message: err.Error()})
	}

	return c.JSON(http.StatusOK, schema.SuccessResponse{Message: "Chapter created successfully."})
}
