package schema

import (
	"context"

	"backend/model/domain"
)

type LoginRequest struct {
	Email    string `form:"email" binding:"required,email"`
	Password string `form:"password" binding:"required"`
}

type LoginResponse struct {
	AccessToken  string `json:"accessToken"`
	RefreshToken string `json:"refreshToken"`
}

type LoginUsecase interface {
	GetUserByEmail(c context.Context, email string) (domain.User, error)
	CreateAccessToken(user *domain.User, secret string, expiry int) (accessToken string, err error)
	CreateRefreshToken(user *domain.User, secret string, expiry int) (refreshToken string, err error)
}
