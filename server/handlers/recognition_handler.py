from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from models.digit import Digit
from services.recognition_service import RecognitionService


app = FastAPI()

recognition_service = RecognitionService(model_path='models/model.h5')

app.post("/predict", response_model=Digit)
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
    digit = recognition_service.recognize(contents)
    return JSONResponse({'digit': digit})

