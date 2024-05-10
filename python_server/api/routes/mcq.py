from typing import Annotated

from fastapi import APIRouter, Body, Header
from starlette.status import HTTP_201_CREATED
import requests

from genai import multiple_choice

router = APIRouter()

@router.post(
    "/"
)
async def practice(
    req = Body(..., embed=False),
    Authorization: Annotated[str | None, Header(convert_underscores=False)] = None,
):
    headers = {
        "Authorization": Authorization
    }
    try:
        data = multiple_choice.multiple_choice_service(req["context"])
        
        if not data["success"]:
            return {
                "success": False
            }
        if not data["question"]["answers"]:
            return {
                "success": False
            }
        
        result = requests.post("http://127.0.0.1:8080/api/practice/" + req["tid"], json=data["question"], headers=headers)
        print(result.json())

        return {
            "success": True
        }
    except:
        return{
            "success": False
        }
    