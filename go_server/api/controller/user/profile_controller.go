package user

import (
	"net/http"

	"backend/internal/tokenutil"
	"backend/model/schema"

	"github.com/labstack/echo/v4"
	"google.golang.org/appengine"
)

type ProfileController struct {
	ProfileUsecase schema.ProfileUsecase
}

func (pc *ProfileController) Fetch(c echo.Context) error {
	ctx := appengine.NewContext(c.Request())
	uid, err := tokenutil.ExtractIDFromContext(c)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, schema.ErrorResponse{Message: err.Error()})
	}

	profile, err := pc.ProfileUsecase.GetProfileByID(ctx, uid)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, schema.ErrorResponse{Message: err.Error()})
	}

	return c.JSON(http.StatusOK, profile)
}
