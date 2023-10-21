from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000'],  # Adjust this to your needs
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

class ScoreInput(BaseModel):
    missedPayments: int
    currentDebt: float
    duration: int

@app.post("/credit")
def read_root(score: ScoreInput):
    
    missedPayments  = score.missedPayments
    currentDebt  = score.currentDebt
    duration  = score.duration
    
    # run AI model
    
    AIModelReturn = 0
    
    return {'aireturn': AIModelReturn}
