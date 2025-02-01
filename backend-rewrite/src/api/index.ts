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

router.post('/item', async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.body)
    // Create a new document reference with auto-generated ID
    const itemRes = await db.collection('items').add(
{
      description: req.body.description,
      // image: req.body.image,
      tags: req.body.tags,
      conditions: req.body.conditions,
      user_id: req.body.user_id,
      rentalTerms: req.body.rentalTerms,
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
