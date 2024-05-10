from typing import Annotated
from fastapi import APIRouter, Body, Header

from genai import question_answer

router = APIRouter()

@router.post("/")
async def question(
    req = Body(..., embed=False),
    Authorization: Annotated[str | None, Header(convert_underscores=False)] = None,
):
    headers = {
        "Authorization": Authorization
    }
    explanation = question_answer.question_answer_service(req["question"])

    return {
        "explanation": explanation
    }