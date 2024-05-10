package usecase

import (
	"context"
	"time"

	"backend/model/domain"
)

type chapterUsecase struct {
	chapterRepository domain.ChapterRepository
	contextTimeout    time.Duration
}

func NewChapterUsecase(chapterRepository domain.ChapterRepository, timeout time.Duration) domain.ChapterUsecase {
	return &chapterUsecase{
		chapterRepository: chapterRepository,
		contextTimeout:    timeout,
	}
}

func (chu *chapterUsecase) Create(c context.Context, chapter *domain.Chapter) error {
	ctx, cancel := context.WithTimeout(c, chu.contextTimeout)
	defer cancel()
	return chu.chapterRepository.Create(ctx, chapter)
}

func (chu *chapterUsecase) GetByCID(c context.Context, cid string) ([]domain.Chapter, error) {
	ctx, cancel := context.WithTimeout(c, chu.contextTimeout)
	defer cancel()
	return chu.chapterRepository.GetByCID(ctx, cid)
}

func (chu *chapterUsecase) GetByCIDName(c context.Context, cid string, chapterName string) (domain.Chapter, error) {
	ctx, cancel := context.WithTimeout(c, chu.contextTimeout)
	defer cancel()
	return chu.chapterRepository.GetByCIDName(ctx, cid, chapterName)
}
