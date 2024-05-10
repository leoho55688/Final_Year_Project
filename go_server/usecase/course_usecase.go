package usecase

import (
	"context"
	"time"

	"backend/model/domain"
)

type courseUsecase struct {
	courseRepository domain.CourseRepository
	contextTimeout   time.Duration
}

func NewCourseUsecase(courseRepository domain.CourseRepository, timeout time.Duration) domain.CourseUsecase {
	return &courseUsecase{
		courseRepository: courseRepository,
		contextTimeout:   timeout,
	}
}

func (cu *courseUsecase) Create(c context.Context, course *domain.Course) error {
	ctx, cancel := context.WithTimeout(c, cu.contextTimeout)
	defer cancel()
	return cu.courseRepository.Create(ctx, course)
}

func (cu *courseUsecase) GetByUID(c context.Context, uid string) ([]domain.Course, error) {
	ctx, cancel := context.WithTimeout(c, cu.contextTimeout)
	defer cancel()
	return cu.courseRepository.GetByUID(ctx, uid)
}

func (cu *courseUsecase) InsertChapter(c context.Context, chapter *domain.ChapterUpdateInCourse) error {
	ctx, cancel := context.WithTimeout(c, cu.contextTimeout)
	defer cancel()
	return cu.courseRepository.InsertChapter(ctx, chapter)
}
