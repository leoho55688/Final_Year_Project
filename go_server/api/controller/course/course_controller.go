package course

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

type CourseController struct {
	CourseUsecase domain.CourseUsecase
	Env           *bootstrap.Env
}

func (cc *CourseController) Fetch(c echo.Context) error {
	ctx := appengine.NewContext(c.Request())
	userID, err := tokenutil.ExtractIDFromContext(c)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, schema.ErrorResponse{Message: err.Error()})
	}

	courses, err := cc.CourseUsecase.GetByUID(ctx, userID)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, schema.ErrorResponse{Message: err.Error()})
	}

	return c.JSON(http.StatusOK, courses)
}

func (cc *CourseController) Create(c echo.Context) error {
	ctx := appengine.NewContext(c.Request())
	var request schema.CourseCreateRequest

	err := c.Bind(&request)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, schema.ErrorResponse{Message: err.Error()})
	}

	uid, err := tokenutil.ExtractIDFromContext(c)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, schema.ErrorResponse{Message: err.Error()})
	}

	course := domain.Course{
		ID:       primitive.NewObjectID(),
		UID:      uid,
		Name:     request.Name,
		Code:     request.Code,
		Chapters: []string{},
	}

	err = cc.CourseUsecase.Create(ctx, &course)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, schema.ErrorResponse{Message: err.Error()})
	}

	courseCreateResponse := schema.CourseCreateResponse{
		CID: course.ID.String(),
	}
	return c.JSON(http.StatusOK, courseCreateResponse)
}
