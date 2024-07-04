from fastapi import FastAPI
from fastapi import APIRouter
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from src.model.model import classify_image

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"], 
)

@app.get('/__healthCheck')
def health_check():
    return { 'health': 'OK' }

class Input(BaseModel):
    image: str

router = APIRouter(
    prefix='/classify',
    tags=['classify']
)

@router.post("/")
async def classify(input: Input) -> dict[str, dict[str, float | str]]:
    try:
        result = await classify_image(input.image)
        return {
            'data': result
        }
    except:
        return {
            'error': {
                'message': 'Classification error'
            }
        }


app.include_router(router, prefix='/api')