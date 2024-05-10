package usecase

import (
	"context"
	"time"

	"backend/model/domain"
)

type questionUsecase struct {
	questionRepository domain.QuestionRepository
	contextTimeout     time.Duration
}

func NewQuestionUsecase(questionRepository domain.QuestionRepository, timeout time.Duration) domain.QuestionUsecase {
	return &questionUsecase{
		questionRepository: questionRepository,
		contextTimeout:     timeout,
	}
}

func (cu *questionUsecase) Create(c context.Context, question *domain.MCQuestion) error {
	ctx, cancel := context.WithTimeout(c, cu.contextTimeout)
	defer cancel()
	return cu.questionRepository.Create(ctx, question)
}

func (cu *questionUsecase) GetByTID(c context.Context, tid string) ([]domain.MCQuestion, error) {
	ctx, cancel := context.WithTimeout(c, cu.contextTimeout)
	defer cancel()
	return cu.questionRepository.GetByTID(ctx, tid)
}
