import express from 'express';

import db from '../db';
import asyncMiddleware from '../middlewares/asyncMiddleware';

const router = express.Router();

router.get('/api/search', asyncMiddleware(async (req, res) => {
  const { name } = req.query;

  if (name.length === 0)  {
    return res.send([]);
  } 
  const products = await db.Product.find({ name: { $regex: `^${name}`, $options: 'i' } });

  return res.send(products);    
}));

export default router;