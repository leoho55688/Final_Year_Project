package repository

import (
	"context"

	"backend/model/domain"
	"backend/mongo"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type questionRepository struct {
	database   mongo.Database
	collection string
}

func NewQuestionRepository(db mongo.Database, collection string) domain.QuestionRepository {
	return &questionRepository{
		database:   db,
		collection: collection,
	}
}

func (cr *questionRepository) Create(c context.Context, question *domain.MCQuestion) error {
	collection := cr.database.Collection(cr.collection)

	_, err := collection.InsertOne(c, question)

	return err
}

func (cr *questionRepository) GetByTID(c context.Context, tid string) ([]domain.MCQuestion, error) {
	collection := cr.database.Collection(cr.collection)

	filter := bson.M{
		"tid": tid,
	}
	opts := options.Find()
	cursor, err := collection.Find(c, filter, opts)

	if err != nil {
		return nil, err
	}
	defer cursor.Close(c)

	var questions []domain.MCQuestion

	err = cursor.All(c, &questions)
	if err != nil {
		return []domain.MCQuestion{}, err
	}

	return questions, nil
}
