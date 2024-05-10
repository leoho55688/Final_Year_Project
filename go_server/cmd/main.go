package main

import (
	"time"

	"backend/api/route"
	"backend/bootstrap"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {

	app := bootstrap.App()

	env := app.Env

	db := app.Mongo.Database(env.DBName)
	defer app.CloseDBConnection()

	// conn := app.GenAI
	// defer app.CloseGenAIConnection()

	// ctx, cancel := context.WithTimeout(context.Background(), 200*time.Second)
	// defer cancel()
	// c := genai.NewGenerativeAIClient(conn)
	// r, err := c.MultipleChoice(ctx, &genai.MCRequest{Context: "IP TCP SSL Record Protocol SSL Handshake Protocol SSL Change Cipher Spec Protocol SSL Alert Protocol HTTP Figure 5.2 SSL Protocol Stack peer relationships. The connections are transient. Every connection is ed with one session. An SSL session is an association between a client and a server. Sessions ted by the Handshake Protocol. Sessions define a set of cryptographic"})
	// if err != nil {
	// 	log.Fatalf("could not greet: %v", err)
	// }
	// log.Printf("Question: %s", r.GetQuestion())
	// log.Printf("Answers: %s", r.GetAnswers())
	// log.Printf("Correct Answer: %v", r.GetCorrectAnswer())
	// log.Printf("Explanation: %s", r.GetExplanation())

	timout := time.Duration(env.ContextTimeout) * time.Second

	e := echo.New()

	// setup basic middlewares
	e.Use(middleware.CORS())

	route.Setup(env, timout, db, e)

	e.Logger.Fatal(e.Start(env.ServerAddress))

}
