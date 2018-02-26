import express from 'express';
import boom from 'boom';

import db from '../db';
import asyncMiddleware from '../middlewares/asyncMiddleware';
import cleanUser from './utils/cleanUser';
import sendNewPassword from './utils/sendNewPassword';

const router = express.Router();

router.get('/api/auth/remember', asyncMiddleware(async (req, res) => {
  if (!req.session.remember) {
    throw boom.notFound();
  }

  res.send(req.session.remember);
}));

router.get('/api/auth/forgot', asyncMiddleware(async (req, res) => {
  const { email } = req.query;
  const user = await db.User.findOne({ email });
  const success = user !== null;

  if (success) {
    const randomPassword = user.generatePassword(6);
    const hash = await user.updateUserPassword(randomPassword);
    const response = await sendNewPassword(email, randomPassword);
    
    return res.send({ message: success, randomPassword });
  }
  
  res.send({ message: success });
}));

router.get('/api/auth', asyncMiddleware(async (req, res) => {
  if (!req.user || !req.user.auth) {
    throw boom.unauthorized('Пользователь не авторизован');
  }

  const { userId } = req.user;
  const user = await db.User.findById(userId);
  const cart = await db.Cart.getCart(userId);
  const items =  await cart.getItems();

  res.send({ user: cleanUser(user), cart: items});
})); 

// Authorization user
router.post('/api/auth', asyncMiddleware(async (req, res) => {
  const { session } = req;
  const { form, remember }= req.body;

  const user = await db.User.authorize(form);
  const userId = user.getUserId();
  const cart = await db.Cart.getCart(userId);
  const items =  await cart.getItems();
  
  if (!session.user || session.user.userId !== userId) {
    session.user = { userId };
  } 

  if (remember) {
    const { email, password } = form;

    session.remember = { email, password };
  }

  session.user.auth = true;

  res.send({ user: cleanUser(user), cart: items});
}));

// Logout
router.delete('/api/auth', asyncMiddleware(async (req, res) => {
  const { session } = req;
  
  session.user.auth = false;
  session.save(e => {
    if (e) throw e;
    
    res.sendStatus(200);
  });
}));

export default router;