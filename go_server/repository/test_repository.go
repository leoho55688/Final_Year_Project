package repository

import (
	"context"

	"backend/model/domain"
	"backend/mongo"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type testRepository struct {
	database   mongo.Database
	collection string
}

func NewTestRepository(db mongo.Database, collection string) domain.TestRepository {
	return &testRepository{
		database:   db,
		collection: collection,
	}
}

func (tr *testRepository) Create(c context.Context, test *domain.Test) error {
	collection := tr.database.Collection(tr.collection)

	_, err := collection.InsertOne(c, test)

	return err
}

func (tr *testRepository) GetByUID(c context.Context, uid string) ([]domain.Test, error) {
	collection := tr.database.Collection(tr.collection)

	filter := bson.M{
		"uid": uid,
	}
	opts := options.Find()
	cursor, err := collection.Find(c, filter, opts)

	if err != nil {
		return nil, err
	}
	defer cursor.Close(c)

	var tests []domain.Test

	err = cursor.All(c, &tests)
	if err != nil {
		return []domain.Test{}, err
	}

	return tests, nil
}
