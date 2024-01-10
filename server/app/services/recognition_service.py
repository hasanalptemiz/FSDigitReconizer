from http.client import HTTPException
from fastapi import UploadFile
from PIL import Image
from io import BytesIO
from random import randint
from app.models.model import mnist
from torchvision import transforms
import torch


ai_model = mnist(pretrained  = True)


def is_image(file: UploadFile):
    # supported images
    supported_image_types = ["image/jpeg", "image/png", "image/gif"]

    # get MIME type
    content_type = file.content_type.lower()

    # check is the file MIME picture type
    if content_type not in supported_image_types:
        return False

    return True


def recognize_image(image: Image.Image) -> int:
    #AI Process
    #Convert image to grayscale :
    image = image.convert("L")
    #Convert image to torch tensor : 
    #if image size bigger than 28x28, resize it :
    if image.size[0] != 28 or image.size[1] != 28:
        image = transforms.Resize((28, 28))(image)

    image = transforms.PILToTensor()(image).float()

    #Normalize image :
    image = transforms.Normalize((0.1307,), (0.3081,))(image)

    #Run inference :
    output = ai_model(image)

    #Get the predicted digit :
    predicted_digit = output.argmax().item()
    return predicted_digit

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
        predicted_digit = recognize_image(img)
        
        return {"predicted_digit": predicted_digit}
    
    except Exception as e:
        return {"error": str(e)}
