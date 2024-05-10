from fastapi import APIRouter

from api.routes import mcq, qa

router = APIRouter()

router.include_router(mcq.router, tags=["practice"], prefix="/practice")
router.include_router(qa.router, tags=["question-answer"], prefix="/question-answer")