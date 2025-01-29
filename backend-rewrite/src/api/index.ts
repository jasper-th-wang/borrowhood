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
    res.json({ docs: items });
  } catch (error) {
    next(error);
  }
});

router.use('/emojis', emojis);

export default router;
