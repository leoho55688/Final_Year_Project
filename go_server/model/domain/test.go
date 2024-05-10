package domain

import (
	"context"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

const (
	CollectionTest = "Test"
)

type Test struct {
	ID             primitive.ObjectID `bson:"_id" json:"id"`
	CID            string             `bson:"cid" json:"cid"`
	UID            string             `bson:"uid" json:"uid"`
	QuestionNumber int                `bson:"questionNumber" json:"questionNumber"`
	PreviousResult int                `bson:"previousResult" json:"previousResult"`
	CourseCode     string             `bson:"courseCode" json:"courseCode"`
}

type TestRepository interface {
	Create(c context.Context, test *Test) error
	GetByUID(c context.Context, cid string) ([]Test, error)
}

type TestUsecase interface {
	Create(c context.Context, test *Test) error
	GetByUID(c context.Context, cid string) ([]Test, error)
}
