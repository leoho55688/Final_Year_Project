package domain

import (
	"context"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

const (
	CollectionQuestion = "Question"
)

type MCQuestion struct {
	ID             primitive.ObjectID `bson:"_id" json:"id"`
	TID            string             `bson:"tid" json:"tid"`
	Question       string             `bson:"question" json:"question"`
	Answers        []string           `bson:"answers" json:"answers"`
	CorrectAnswer  string             `bson:"correctAnswer" json:"correctAnswer"`
	PreviousAnswer bool               `bson:"previousAnswer" json:"previousAnswer"`
	Explanation    string             `bson:"explanation" json:"explanation"`
}

type QuestionRepository interface {
	Create(c context.Context, question *MCQuestion) error
	GetByTID(c context.Context, tid string) ([]MCQuestion, error)
}

type QuestionUsecase interface {
	Create(c context.Context, question *MCQuestion) error
	GetByTID(c context.Context, tid string) ([]MCQuestion, error)
}
