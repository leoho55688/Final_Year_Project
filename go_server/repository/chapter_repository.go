package repository

import (
	"context"

	"backend/model/domain"
	"backend/mongo"

	"go.mongodb.org/mongo-driver/bson"
)

type chapterRepository struct {
	database   mongo.Database
	collection string
}

func NewChapterRepository(db mongo.Database, collection string) domain.ChapterRepository {
	return &chapterRepository{
		database:   db,
		collection: collection,
	}
}

func (chr *chapterRepository) Create(c context.Context, chapter *domain.Chapter) error {
	collection := chr.database.Collection(chr.collection)

	_, err := collection.InsertOne(c, chapter)

	return err
}

func (chr *chapterRepository) GetByCID(c context.Context, cid string) ([]domain.Chapter, error) {
	collection := chr.database.Collection(chr.collection)

	filter := bson.M{
		"cid": cid,
	}
	cursor, err := collection.Find(c, filter)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(c)

	var chapters []domain.Chapter
	err = cursor.All(c, &chapters)
	if err != nil {
		return []domain.Chapter{}, err
	}

	return chapters, nil
}

func (chr *chapterRepository) GetByCIDName(c context.Context, cid string, chapterName string) (domain.Chapter, error) {
	collection := chr.database.Collection(chr.collection)

	filter := bson.M{
		"cid":  cid,
		"name": chapterName,
	}
	var chapter domain.Chapter
	err := collection.FindOne(c, filter).Decode(&chapter)
	if err != nil {
		return domain.Chapter{}, err
	}

	return chapter, nil
}
