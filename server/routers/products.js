import express from 'express';

import db from '../db';
import asyncMiddleware from '../middlewares/asyncMiddleware';

const router = express.Router();

router.get('/api/products', asyncMiddleware(async (req, res) => {
  const { group, category } = req.query;
  const collection = group ? {group} 
    : category ? {category} 
    : null;

  const products = await db.Product.getProductsBy(collection);

  res.send(products);
}));

router.get('/api/products/:id', asyncMiddleware(async (req, res) => {
  const { id } = req.params;
  const product = await db.Product.getProductById(id);

  res.send(product);
}));

export default router;