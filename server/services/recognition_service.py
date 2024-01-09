from http.client import HTTPException
from fastapi import Depends,UploadFile, File, APIRouter
from PIL import Image
from io import BytesIO


def is_image(file: UploadFile):
    # supported images
    supported_image_types = ["image/jpeg", "image/png", "image/gif"]

    # get mime type
    content_type = file.content_type.lower()

    # check is the file mime picture type
    if content_type not in supported_image_types:
        return False

    return True


def recognize_image(image: Image.Image) -> int:
    #AI Process
    return 42


async def process_image(file: UploadFile) -> dict:
    try:
        # Check the file type
        if not is_image(file):
            raise HTTPException(status_code=400, detail="Unsupported file type. Only images are allowed.")

        contents = await file.read()

        # Check the image 
        try:
            img = Image.open(BytesIO(contents))
        except Exception as e:
            raise HTTPException(status_code=400, detail="Invalid image file.")

        # Ai model function call
        predicted_digit = recognize_image(contents)

        return {"predicted_digit": predicted_digit}
    except Exception as e:
        return {"error": str(e)}
