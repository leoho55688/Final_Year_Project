package domain

import (
	"context"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

const (
	CollectionChapter = "Chapter"
)

type Chapter struct {
	ID      primitive.ObjectID `bson:"_id" json:"id"`
	CID     string             `bson:"cid" json:"cid"`
	Name    string             `bson:"name" form:"name" binding:"required" json:"name"`
	Content []string           `bson:"content" json:"content"`
}

type ChapterRepository interface {
	Create(c context.Context, chapter *Chapter) error
	GetByCID(c context.Context, cid string) ([]Chapter, error)
	GetByCIDName(c context.Context, cid string, chapterName string) (Chapter, error)
}

type ChapterUsecase interface {
	Create(c context.Context, chapter *Chapter) error
	GetByCID(c context.Context, cid string) ([]Chapter, error)
	GetByCIDName(c context.Context, cid string, chapterName string) (Chapter, error)
}

type ChapterUpdateInCourse struct {
	CID  string
	Name string
}
