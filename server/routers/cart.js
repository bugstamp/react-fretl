import express from 'express';
import boom from 'boom';

import db from '../db';
import asyncMiddleware from '../middlewares/asyncMiddleware';
import sessionCart from '../middlewares/sessionCart';

const router = express.Router();

router.get('/api/cart', sessionCart, asyncMiddleware(async (req, res) => {
  const { userId } = req.user;

  const cart = await db.Cart.getCart(userId);
  const cartItems = await cart.getItems();

  res.send(cartItems); 
}));

router.post('/api/cart', sessionCart, asyncMiddleware(async (req, res) => {
  const { userId } = req.user;
  const { productId, order } = req.body;

  const product = await db.Product.getProductById(productId);
  const cart = await db.Cart.getCart(userId);
  const item = await cart.addItem(productId, order);
  
  res.send({ ...product, order: item.order }); 
}));

router.put('/api/cart/', sessionCart, asyncMiddleware(async (req, res) => {
  const { userId } = req.user;
  const { productId, type } = req.body;

  const cart = await db.Cart.getCart(userId);
  const item = await cart.updateItem(productId, type);

  res.send(item); 
}));

router.delete('/api/cart/:id', sessionCart, asyncMiddleware(async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;
  
  const cart = await db.Cart.getCart(userId);
  const result = await cart.removeItem(id);
  
  res.send({ result }); 
}));

export default router;