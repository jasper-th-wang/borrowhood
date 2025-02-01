import express, { Request, Response, NextFunction } from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import emojis from './emojis';
import { db } from '../firebase';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});


router.get('/item', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const itemsSnapshot = await db.collection('items').get();
    const items = itemsSnapshot.docs.map(doc => doc.data());
    res.json(items);
  } catch (error) {
    next(error);
  }
});

router.post('/image/annotate', async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);
  res.status(200).json({hello: "hello"});
})

router.post('/item', async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.body)
      // Create a new document reference with auto-generated ID
      const itemRes = await db.collection('items').add(
          {
              coordinates: {
                  lat: req.body.lat,
                  lng: req.body.lng,
              },
              title: req.body.title,
              description: req.body.description,
              // image: req.body.image,
              tags: req.body.tags,
              conditions: req.body.conditions,
              ownerId: req.body.user_id,
              rental_terms: req.body.rental_terms,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
          }
      );


      res.status(201).json(itemRes);
  } catch (error) {
      next(error);
  }
});


router.get('/community', async (req: Request, res: Response, next: NextFunction) => {
    try {
    const communitiesSnapshot = await db.collection('communities').get();
    console.log(communitiesSnapshot);
    const communities = communitiesSnapshot.docs.map(doc => doc.data());
    res.json(communities);
  } catch (error) {
    next(error);
  }
});


router.use('/emojis', emojis);

export default router;
