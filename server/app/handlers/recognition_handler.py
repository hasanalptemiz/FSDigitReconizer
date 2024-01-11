from fastapi import FastAPI, File, UploadFile, HTTPException, Depends , APIRouter
from fastapi.responses import JSONResponse, StreamingResponse
from app.services.recognition_service import process_image


router = APIRouter()

@router.post("/recognize")
async def digit_recognize(file: UploadFile = File(...)):
    try:
        return await process_image(file)
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
    

def get_router():
    return router