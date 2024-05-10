class MCQuestion:
    def __init__(self, question: str, answers: list[str], correct_answer: str, explanation: str) -> None:
        self.question = question
        self.answers = answers
        self.correct_answer = correct_answer
        self.explanation = explanation