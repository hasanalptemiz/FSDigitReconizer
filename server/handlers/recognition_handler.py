from fastapi import FastAPI, File, UploadFile, HTTPException, Depends , APIRouter
from fastapi.responses import JSONResponse, StreamingResponse
from PIL import Image
from io import BytesIO
from services.recognition_service import recognize_image, process_and_store_image


router = APIRouter()

@router.post("/upload/")
async def upload_image(processed_image: Image.Image = Depends(process_and_store_image)):
    # Upload edilen resmi işleme ve saklama adımlarını gerçekleştirir
    # Daha sonra bu işlenmiş resmi HTTP yanıtı olarak tarayıcıya gönderir
    img_byte_array = BytesIO()
    processed_image.save(img_byte_array, format="PNG")
    
    return StreamingResponse(BytesIO(img_byte_array.getvalue()), media_type="image/png")

@router.post("/recognize/")
async def recognize_uploaded_image(processed_image: Image.Image = Depends(process_and_store_image)):
    # İşlenmiş resmi yapay zeka modeli kullanarak tanıma işlemine geçirir
    # Tanıma sonucunu bir integer olarak döner
    result_integer = recognize_image(processed_image)

    return JSONResponse(content={"result": result_integer})

def get_router():
    return router