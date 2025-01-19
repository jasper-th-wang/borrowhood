from fastapi import FastAPI, HTTPException, File, UploadFile
from firebase_admin import credentials, firestore, initialize_app
from typing import List, Dict, Any
from google.cloud import vision
from llamaapi import LlamaAPI
import tempfile
import json
import os
import base64
from pathlib import Path

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
        print("hogehoge")
        user_tags = user_data.get('tags', [])

        if not user_tags:
            return {"items": [], "groups": []}

        # Query items collection
        items_query = db.collection('items') \
            .where('tags', 'array_contains_any', user_tags)

        items_snapshot = items_query.stream()

        # Query groups collection
        groups_query = db.collection('groups') \
            .where('tags', 'array_contains_any', user_tags) \

        groups_snapshot = groups_query.stream()

        # Format results
        items = [item.to_dict() for item in items_snapshot]
        groups = [group.to_dict() for group in groups_snapshot]

        return {
            "items": items,
            "groups": groups
        }

    except Exception as e:
        # print("hogehoge")
        raise HTTPException(status_code=500, detail=str(e))

    return HTTPException(status_code=500, detail="Server Error")

@app.get("/item")
async def get_items():
    """Get all the items to display to the user"""
    try:
        # Get user document by user_id field
        items_query = db.collection('items').stream()
        item_docs = list(items_query.stream())


        return {"docs": items_docs}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    return HTTPException(status_code=500, detail="Server Error")

@app.get("/item/")
async def get_item_by_id(item_id: str):
    "Get Item by id"
    try:
        # Get user document by user_id field
        item_query = db.collection('users').where('id', '==', item_id)
        item_doc = list(item_query.stream())

        if not item_docs:
            raise HTTPException(status_code=404, detail="User not found")

        item_doc = item_docs[0]

        if not user_doc.exists:
            raise HTTPException(status_code=404, detail="User not found")

        item_doc = item_doc.to_dict()

        return {
            "Item": item_doc,
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    return HTTPException(status_code=500, detail="Server Error")

# TODO: endpoint to save an item to the doc
# TODO: need to save picture and data to the firebase
# TODO: request needs to pe post request


@app.post("/image/annotate")
async def annotate_image(image: UploadFile = File(...)):
    image_bytes = await image.read()


    # Instantiates a client
    client = vision.ImageAnnotatorClient()


    image = vision.Image(content=image_bytes)

    # Performs label detection on the image file
    response = client.text_detection(image=image)
    response2 = client.label_detection(image=image)
    texts = response.text_annotations
    labels = response2.label_annotations
    
    texts_str = "Texts: " 
    print("Texts:")
    for text in texts:
        texts_str += text.description.replace("\n", " ")
        texts_str += "\n"
        print(text.description.replace("\n", " " ))

    labels_str = "Texts: " 
    print("Labels:")
    for label in labels:
        labels_str += label.description.replace("\n", " ")
        labels_str += ", "
        print(label.description.replace("\n", " " ))


    message_string = texts_str 

    payload = {
        "model": "llama3.3-70b",
        "functions": [
            {
                "name": "get_image_metadata",
                "description": "Get a cute description to sell the item to other people.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "title": {
                            "type": "string",
                            "description": "A title for the given texts.",
                        },
                        "content": {
                            "type": "string",
                            "description": "Create a cute text parah to sell an item with which the given text is associated with."
                        },
                    },
                    "required": ["title", "content"],
                },
            }
        ],
        "function_call": {"name": "get_image_metadata"},
        "messages": [
            {
                "role": "user",
                "content": f"Based on this text, {message_string}, create a cute description to sell this item to others.",
            }
        ]
    }




    response_llama = llama.run(payload)

    output = response_llama.json()
    print(output)


    return {"message": output}

if __name__ == '__main__':
    uvicorn.run(app, loop='asyncio')
