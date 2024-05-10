package auth

import (
	"net/http"

	"backend/bootstrap"
	"backend/model/domain"
	"backend/model/schema"

	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"
	"google.golang.org/appengine"
)

type SignupController struct {
	SignupUsecase schema.SignupUsecase
	Env           *bootstrap.Env
}

func (sc *SignupController) Signup(c echo.Context) error {
	var request schema.SignupRequest
	ctx := appengine.NewContext(c.Request())

	err := c.Bind(&request)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, schema.ErrorResponse{Message: err.Error()})
	}

	_, err = sc.SignupUsecase.GetUserByEmail(ctx, request.Email)
	if err == nil {
		return echo.NewHTTPError(http.StatusConflict, schema.ErrorResponse{Message: "User already exists with the given email"})
	}

	encryptedPassword, err := bcrypt.GenerateFromPassword(
		[]byte(request.Password),
		bcrypt.DefaultCost,
	)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, schema.ErrorResponse{Message: err.Error()})
	}

	request.Password = string(encryptedPassword)

	user := domain.User{
		ID:       primitive.NewObjectID(),
		Name:     request.Name,
		Email:    request.Email,
		Password: request.Password,
	}

	err = sc.SignupUsecase.Create(ctx, &user)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, schema.ErrorResponse{Message: err.Error()})
	}

	accessToken, err := sc.SignupUsecase.CreateAccessToken(&user, sc.Env.AccessTokenSecret, sc.Env.AccessTokenExpiryHour)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, schema.ErrorResponse{Message: err.Error()})
	}

	refreshToken, err := sc.SignupUsecase.CreateRefreshToken(&user, sc.Env.RefreshTokenSecret, sc.Env.RefreshTokenExpiryHour)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, schema.ErrorResponse{Message: err.Error()})
	}

	signupResponse := schema.SignupResponse{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	}

	return c.JSON(http.StatusOK, signupResponse)
}
