from fastapi import FastAPI
from handlers.recognition_handler import get_router


app = FastAPI()
app.include_router(get_router())


@app.get("/")
def read_root():
    return {"message": "Welcome to the FS Digit Recognizer API."}

if __name__ == "__main__":
    import uvicorn
    print("Starting server...")
    uvicorn.run(app, host="0.0.0.0", port=8000)