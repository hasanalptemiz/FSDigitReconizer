from app.handlers.recognition_handler import get_router
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI


app = FastAPI()

# CORS ayarları
origins = [
    "http://localhost:3000",  # React uygulamasının çalıştığı adres
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(get_router())


@app.get("/")
def read_root():
    return {"message": "Welcome to the FS Digit Recognizer API."}

if __name__ == "__main__":
    import uvicorn
    print("Starting server...")
    uvicorn.run(app, host="0.0.0.0", port=8000)