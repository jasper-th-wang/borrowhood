from fastapi import FastAPI, HTTPException, File, UploadFile
from firebase_admin import credentials, firestore, initialize_app
from typing import List, Dict, Any
from google.cloud import vision
from llamaapi import LlamaAPI
import json
import os
import base64

# Initialize Firebase
cred = credentials.Certificate('firebase-adminsdk.json')
initialize_app(cred)
db = firestore.client()

LLAMA_API_KEY = os.environ['LLAMA_API_KEY']

app = FastAPI()
llama = LlamaAPI(LLAMA_API_KEY)

@app.get("/")
async def root():
    return {"message": "Hello World"}

def encode_image_to_base64(image_bytes):
    """Convert an image file to base64 string."""
    return base64.b64encode(image_bytes).decode('utf-8')

@app.get("/recommendations")
async def get_recommendations(user_id: str):
    """Get personalized recommendations for a user based on their tags"""
    try:
        # Get user document by user_id field
        user_query = db.collection('users').where('id', '==', user_id)
        user_docs = list(user_query.stream())

        if not user_docs:
            raise HTTPException(status_code=404, detail="User not found")

        user_doc = user_docs[0]

        if not user_doc.exists:
            raise HTTPException(status_code=404, detail="User not found")

        user_data = user_doc.to_dict()
        user_tags = user_data.get('tags', [])

        if not user_tags:
            return {"items": [], "groups": []}

        # Query items collection
        items_query = db.collection('items') \
            .where('tags', 'array_contains_any', user_tags) \
            .limit(5)
        items_snapshot = items_query.stream()

        # Query groups collection
        groups_query = db.collection('groups') \
            .where('tags', 'array_contains_any', user_tags) \
            .limit(5)

        groups_snapshot = groups_query.stream()

        # Format results
        items = [item.to_dict() for item in items_snapshot]
        groups = [group.to_dict() for group in groups_snapshot]

        return {
            "items": items,
            "groups": groups
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/item")
async def get_items():
    """Get all the items to display to the user"""
    try:
        # Get user document by user_id field
        items_query = db.collection('items').stream()
        item_docs = list(items_query.stream())


        return {"docs": item_docs}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/item/{item_id}")
async def get_item_by_id(item_id: str):
    "Get Item by id"
    try:
        # Get user document by user_id field
        item_query = db.collection('items').where('id', '==', item_id)
        item_docs = list(item_query.stream())

        if not item_docs:
            raise HTTPException(status_code=404, detail="User not found")

        item_doc = item_docs[0]

        if not item_doc.exists:
            raise HTTPException(status_code=404, detail="User not found")

        item_doc = item_doc.to_dict()

        return {
            "Item": item_doc,
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/item")
async def create_item(
    id: str,
    ownerId: str,
    title: str,
    description: str,
    tags: List[str],
    rentalTerms: List[str],
    imageURL: UploadFile = File(...)
):
    """Create a new item in Firestore"""
    try:
        # Convert image to base64
        image_bytes = await imageURL.read()
        image_base64 = encode_image_to_base64(image_bytes)

        # Create item document
        item_data = {
            "id": id,
            "ownerId": ownerId,
            "title": title,
            "description": description,
            "tags": tags,
            "image": image_base64,
            "rentalTerms": rentalTerms,
            "created_at": firestore.SERVER_TIMESTAMP
        }

        # Add to Firestore
        item_ref = db.collection('items').document()
        item_ref.set(item_data)

        return {"id": item_ref.id}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/users/{user_id}")
async def get_user_by_id(user_id: str):
    """Get user by id"""
    try:
        # Get user document by user_id field
        user_query = db.collection('users').where('id', '==', user_id)
        user_docs = list(user_query.stream())

        if not user_docs:
            raise HTTPException(status_code=404, detail="User not found")

        user_doc = user_docs[0]

        if not user_doc.exists:
            raise HTTPException(status_code=404, detail="User not found")

        user_data = user_doc.to_dict()

        return {
            "user": user_data,
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

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

        
    base64_image = encode_image_to_base64(image_bytes)
    #return labels

    
    return {"message": "In the annotating function"}

if __name__ == '__main__':
    uvicorn.run(app, loop='asyncio')
