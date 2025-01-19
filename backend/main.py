from fastapi import FastAPI, File, UploadFile
from google.cloud import vision
from llamaapi import LlamaAPI
import os
import json

print(os.environ['LLAMA_API_KEY'])
LLAMA_API_KEY = os.environ['LLAMA_API_KEY']

app = FastAPI()
llama = LlamaAPI(LLAMA_API_KEY)

@app.get("/")
async def root():
    return {"message": "Hello World"}

def encode_image_to_base64(image):
    """Convert an image file to base64 string."""
    return base64.b64encode(image.read_bytes()).decode('utf-8')

@app.post("/image/annotate")
async def annotate_image(image: UploadFile = File(...)):
    image_bytes = await image.read()

    #with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as tmp_file:
        #tmp_file.write(image_bytes)
        #tmp_file_path = tmp_file.name

    # Instantiates a client
    client = vision.ImageAnnotatorClient()

    # The URI of the image file to annotate
    #file_uri = "https://upload.wikimedia.org/wikipedia/en/thumb/6/62/BraveNewWorld_FirstEdition.jpg/220px-BraveNewWorld_FirstEdition.jpg"

    image = vision.Image(content=image_bytes)
    #image.source.image_uri = file_uri

    # Performs label detection on the image file
    #response = client.label_detection(image=tmp_file)
    response = client.text_detection(image=image)
    response2 = client.label_detection(image=image)
    texts = response.text_annotations
    labels = response2.label_annotations
    
    print("Texts:")
    for text in texts:
        print(text.description)

    print("Labels:")
    for label in labels:
        print(label.description)

        
    base64_image = encode_image_to_base64(image)
    #return labels

    
    return {"message": "In the annotating function"}

if __name__ == '__main__':
    uvicorn.run(app, loop='asyncio')
