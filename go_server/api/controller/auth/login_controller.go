package auth

import (
	"net/http"

	"backend/bootstrap"
	"backend/model/schema"

	"github.com/labstack/echo/v4"
	"golang.org/x/crypto/bcrypt"
	"google.golang.org/appengine"
)

type LoginController struct {
	LoginUsecase schema.LoginUsecase
	Env          *bootstrap.Env
}

func (lc *LoginController) Login(c echo.Context) error {
	var request schema.LoginRequest
	ctx := appengine.NewContext(c.Request())

	err := c.Bind(&request)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, schema.ErrorResponse{Message: err.Error()})
	}

	user, err := lc.LoginUsecase.GetUserByEmail(ctx, request.Email)
	if err != nil {
		return echo.NewHTTPError(http.StatusNotFound, schema.ErrorResponse{Message: "User not found with the given email"})
	}

	if bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(request.Password)) != nil {
		return echo.NewHTTPError(http.StatusUnauthorized, schema.ErrorResponse{Message: "Invalid credentials"})
	}

	accessToken, err := lc.LoginUsecase.CreateAccessToken(&user, lc.Env.AccessTokenSecret, lc.Env.AccessTokenExpiryHour)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, schema.ErrorResponse{Message: err.Error()})
	}

	refreshToken, err := lc.LoginUsecase.CreateRefreshToken(&user, lc.Env.RefreshTokenSecret, lc.Env.RefreshTokenExpiryHour)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, schema.ErrorResponse{Message: err.Error()})
	}

	loginResponse := schema.LoginResponse{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	}

	return c.JSON(http.StatusOK, loginResponse)
}
