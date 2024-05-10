package bootstrap

import (
	"backend/genai"
	"log"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

func NewGenAIConnection(env *Env) genai.GenerativeAIClient {
	conn, err := grpc.Dial(env.GenAIAddress, grpc.WithTransportCredentials(insecure.NewCredentials()), grpc.WithBlock())
	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}

	log.Println("Connected to GenAI Server.")

	// c := genai.NewGenerativeAIClient(conn)
	// r, err := c.MultipleChoice(ctx, &genai.MCRequest{Context: "IP TCP SSL Record Protocol SSL Handshake Protocol SSL Change Cipher Spec Protocol SSL Alert Protocol HTTP Figure 5.2 SSL Protocol Stack peer relationships. The connections are transient. Every connection is ed with one session. An SSL session is an association between a client and a server. Sessions ted by the Handshake Protocol. Sessions define a set of cryptographic"})
	// if err != nil {
	// 	log.Fatalf("could not greet: %v", err)
	// }
	// log.Printf("Question: %s", r.GetQuestion())
	// log.Printf("Answers: %s", r.GetAnswers())
	// log.Printf("Correct Answer: %v", r.GetCorrectAnswer())
	// log.Printf("Explanation: %s", r.GetExplanation())

	client := genai.NewGenerativeAIClient(conn)

	return client
}

// func CloseGenAIConnection(conn *grpc.ClientConn) {
// 	if conn == nil {
// 		return
// 	}

// 	err := conn.Close()
// 	if err != nil {
// 		log.Fatal(err)
// 	}

// 	log.Println(("Connection to GenAI Server closed."))
// }
