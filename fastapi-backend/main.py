from fastapi import FastAPI,File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import tensorflow as tf
import numpy as np
from tensorflow import keras 
from PIL import Image,ImageOps
import pickle
import cv2
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

def load_algo_model():
    loaded_model = pickle.load(open('C:/Users/prahm/Downloads/log_model.sav','rb'))
    return loaded_model

"""
file_path = 'C:/Users/prahm/Downloads/cnn_model.hdf5'

try:
    model = tf.keras.models.load_model(file_path)
except Exception as e:
    print(f"Error: {e}")
"""
def load_ann_model():
    # Your ann model loading code
    return None

def load_cnn_model():
    model = tf.keras.models.load_model(r'C:/Users/prahm/Downloads/cnn_model.hdf5', compile=False)
    optimizer = tf.keras.optimizers.Adam(learning_rate=0.001)
    model.compile(optimizer=optimizer, loss='categorical_crossentropy', metrics=['accuracy'])
    return model
    

algo_model = load_algo_model()
cnn_model =load_cnn_model()

@app.post("/api/upload/algo")
async def upload_file(file: UploadFile = File(...)):
    file_size_mb = len(file.file.read()) / (1024 * 1024)
    file.file.seek(0)  # Move the file pointer back to the beginning of the file

    print(f"Received file: {file.filename}, Content-Type: {file.content_type}, Size: {file_size_mb:.2f} MB")
    pil_image = Image.open(file.file)

    # Converting the PIL image to a numpy array
    cur_img = np.array(pil_image)
    
    cur_img = cv2.cvtColor(cur_img,cv2.COLOR_BGR2RGB)
    cur_img = cv2.resize(cur_img,(224,224))
    cur_img=cur_img/255
    cur_img = cur_img.reshape((1, 224, 224, 3))
    #predcur=cnn_model.predict(forge_img)
    message = ""
    a=np.argmax(algo_model.predict(cur_img), axis=1)
    if(a==1):
        message = "The signature is fraud"
    else:
        message = "The signature is not fraud"
    return JSONResponse(content={"message": message}, status_code=200)

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
    pil_image = Image.open(file.file)

    # Convert the PIL image to a numpy array
    cur_img = np.array(pil_image)
    
    cur_img = cv2.cvtColor(cur_img,cv2.COLOR_BGR2RGB)
    cur_img = cv2.resize(cur_img,(224,224))
    cur_img=cur_img/255
    cur_img = cur_img.reshape((1, 224, 224, 3))
    #predcur=cnn_model.predict(forge_img)
    message = ""
    a=np.argmax(cnn_model.predict(cur_img), axis=1)
    if(a==1):
        message = "The signature is fraud"
    else:
        message = "The signature is not fraud"
    return JSONResponse(content={"message": message}, status_code=200)


@app.get("/")
async def curmain():
    return {'data': 'full stack application using fastapi'}
