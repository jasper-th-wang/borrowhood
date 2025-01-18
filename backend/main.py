from fastapi import FastAPI, HTTPException
from firebase_admin import credentials, firestore, initialize_app
from typing import List, Dict, Any
import os

# Initialize Firebase
cred = credentials.Certificate('firebase-adminsdk.json')
initialize_app(cred)
db = firestore.client()

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

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
