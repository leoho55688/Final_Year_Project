package usecase

import (
	"context"
	"time"

	"backend/model/domain"
)

type testUsecase struct {
	testRepository domain.TestRepository
	contextTimeout time.Duration
}

func NewTestUsecase(testRepository domain.TestRepository, timeout time.Duration) domain.TestUsecase {
	return &testUsecase{
		testRepository: testRepository,
		contextTimeout: timeout,
	}
}

func (cu *testUsecase) Create(c context.Context, test *domain.Test) error {
	ctx, cancel := context.WithTimeout(c, cu.contextTimeout)
	defer cancel()
	return cu.testRepository.Create(ctx, test)
}

func (cu *testUsecase) GetByUID(c context.Context, uid string) ([]domain.Test, error) {
	ctx, cancel := context.WithTimeout(c, cu.contextTimeout)
	defer cancel()
	return cu.testRepository.GetByUID(ctx, uid)
}
