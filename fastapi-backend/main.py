from fastapi import FastAPI,File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
app = FastAPI()

origins = [
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.post("/api/upload/algo")
async def upload_file(file: UploadFile = File(...)):
    file_size_mb = len(file.file.read()) / (1024 * 1024)
    file.file.seek(0)  # Move the file pointer back to the beginning of the file

    print(f"Received file: {file.filename}, Content-Type: {file.content_type}, Size: {file_size_mb:.2f} MB")

    return JSONResponse(content={"message": "File successfully received"}, status_code=200)
@app.post("/api/upload/ann")
async def upload_file(file: UploadFile = File(...)):
    file_size_mb = len(file.file.read()) / (1024 * 1024)
    file.file.seek(0)  # Move the file pointer back to the beginning of the file

    print(f"Received file: {file.filename}, Content-Type: {file.content_type}, Size: {file_size_mb:.2f} MB")

    return JSONResponse(content={"message": "File successfully received"}, status_code=200)

@app.post("/api/upload/cnn")
async def upload_file(file: UploadFile = File(...)):
    file_size_mb = len(file.file.read()) / (1024 * 1024)
    file.file.seek(0)  # Move the file pointer back to the beginning of the file

    print(f"Received file: {file.filename}, Content-Type: {file.content_type}, Size: {file_size_mb:.2f} MB")

    return JSONResponse(content={"message": "File successfully received"}, status_code=200)


@app.get("/")
async def curmain():
    return {'data': 'full stack application using fastapi'}
