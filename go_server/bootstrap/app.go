package bootstrap

import (
	"backend/genai"
	"backend/mongo"
)

type Application struct {
	Env   *Env
	Mongo mongo.Client
	GenAI genai.GenerativeAIClient
}

func App() Application {
	app := &Application{}
	app.Env = NewEnv()
	app.Mongo = NewMongoDatabase((app.Env))
	// app.GenAI = NewGenAIConnection((app.Env))
	return *app
}

func (app *Application) CloseDBConnection() {
	CloseMongoDBConnection(app.Mongo)
}

// func (app *Application) CloseGenAIConnection() {
// 	CloseGenAIConnection(app.GenAI)
// }
