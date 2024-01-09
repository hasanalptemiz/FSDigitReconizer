from pydantic import BaseModel
from fastapi import UploadFile


class PredictRequest(BaseModel):
    image: UploadFile