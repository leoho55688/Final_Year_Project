package repository

import (
	"context"

	"backend/model/domain"
	"backend/mongo"

	"go.mongodb.org/mongo-driver/bson"
)

type courseRepository struct {
	database   mongo.Database
	collection string
}

func NewCourseRepository(db mongo.Database, collection string) domain.CourseRepository {
	return &courseRepository{
		database:   db,
		collection: collection,
	}
}

func (cr *courseRepository) Create(c context.Context, course *domain.Course) error {
	collection := cr.database.Collection(cr.collection)

	_, err := collection.InsertOne(c, course)

	return err
}

func (cr *courseRepository) GetByUID(c context.Context, uid string) ([]domain.Course, error) {
	collection := cr.database.Collection(cr.collection)

	filter := bson.M{
		"uid": uid,
	}
	cursor, err := collection.Find(c, filter)

	if err != nil {
		return nil, err
	}
	defer cursor.Close(c)

	var courses []domain.Course

	err = cursor.All(c, &courses)
	if err != nil {
		return []domain.Course{}, err
	}

	return courses, nil
}

func (cr *courseRepository) InsertChapter(c context.Context, chapter *domain.ChapterUpdateInCourse) error {
	collection := cr.database.Collection(cr.collection)

	filter := bson.M{
		"_id": chapter.CID,
	}

	var result domain.Course
	err := collection.FindOne(c, filter).Decode(&result)
	if err != nil {
		return err
	}

	var newChapters []string
	if len(result.Chapters) == 0 {
		newChapters = append(newChapters, chapter.Name)
	} else {
		newChapters = append(newChapters, result.Chapters...)
		newChapters = append(newChapters, chapter.Name)
	}

	update := bson.M{
		"chapters": newChapters,
	}
	_, err = collection.UpdateOne(c, filter, update)
	if err != nil {
		return err
	}

	return nil
}
