package domain

import (
	"context"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

const (
	CollectionCourse = "Course"
)

type Course struct {
	ID       primitive.ObjectID `bson:"_id" json:"id"`
	UID      string             `bson:"uid" json:"uid"`
	Name     string             `bson:"name" form:"name" binding:"required" json:"name"`
	Code     string             `bson:"code" form:"title" binding:"required" json:"code"`
	Chapters []string           `bson:"chapters" json:"chapters"`
}

type CourseRepository interface {
	Create(c context.Context, course *Course) error
	GetByUID(c context.Context, uid string) ([]Course, error)
	InsertChapter(c context.Context, chapter *ChapterUpdateInCourse) error
}

type CourseUsecase interface {
	Create(c context.Context, course *Course) error
	GetByUID(c context.Context, uid string) ([]Course, error)
	InsertChapter(c context.Context, chapters *ChapterUpdateInCourse) error
}
