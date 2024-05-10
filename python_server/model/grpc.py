from protos import genai_pb2, genai_pb2_grpc
from genai import multiple_choice

class GenerativeAIService(genai_pb2_grpc.GenerativeAIServicer):
    def TextSplit(self, request, context):
        return genai_pb2.TextSplitResponse(content=["hello"])

    def QuestionAnwser(self, request, context):
        print(request.question)
        return genai_pb2.QAResponse(answer="answer")
    
    def MultipleChoice(self, request, context):
        result = multiple_choice.multiple_choice_service(request.context)
        return genai_pb2.MCResponse(
            question=result.question,
            answers=result.answers,
            correct_answer=result.correct_answer,
            explanation=result.explanation
            )