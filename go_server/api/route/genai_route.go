package route

// func InitGenAIRouter(env *bootstrap.Env, timeout time.Duration, db mongo.Database, genai *grpc.ClientConn, router *echo.Group) {
// 	genaiRouter := router.Group("/genai")

// 	NewGenAIRouter(env, timeout, db, genai, genaiRouter)
// }

// func NewGenAIRouter(env *bootstrap.Env, timeout time.Duration, db mongo.Database, genai *grpc.ClientConn, router *echo.Group) {
// 	qr := repository.NewQuestionRepository(db, domain.CollectionQuestion)
// 	qc := &question.QuestionController{
// 		QuestionUsecase: usecase.NewQuestionUsecase(qr, genai, timeout),
// 	}

// 	// router.POST("/:cid", qc.CreateMultipleChoice)
// }
