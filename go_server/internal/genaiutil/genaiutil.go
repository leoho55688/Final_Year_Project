package genaiutil

import (
	"context"
	"time"

	"backend/genai"
	"backend/model/domain"
)

func TextSplit(client genai.GenerativeAIClient, content string) ([]*genai.Chunk, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 120*time.Second)
	defer cancel()

	result, err := client.TextSplit(ctx, &genai.TextSplitRequest{Content: content})
	if err != nil {
		return nil, err
	}

	return result.GetContent(), nil
}

func CreateMultipleChoice(ctx context.Context, client genai.GenerativeAIClient, topic string) (domain.MCQuestion, error) {
	result, err := client.MultipleChoice(ctx, &genai.MCRequest{Context: topic})
	if err != nil {
		return domain.MCQuestion{}, err
	}

	mcQuestion := domain.MCQuestion{
		Question:      result.GetQuestion(),
		Answers:       result.GetAnswers(),
		CorrectAnswer: result.GetCorrectAnswer(),
		Explanation:   result.GetExplanation(),
	}

	return mcQuestion, nil
}
