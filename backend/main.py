from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class ScoreInput(BaseModel):
    missedPayments: int
    currentDebt: float
    duration: int



@app.post("/")
def read_root(score: ScoreInput):
    
    missedPayments  = score.missedPayments
    currentDebt  = score.currentDebt
    duration  = score.duration
    
    # run AI model
    
    AIModelReturn = 0
    
    return {'aireturn': AIModelReturn}
