import express from 'express';
// import boom from 'boom';

import db from '../db';
import asyncMiddleware from '../middlewares/asyncMiddleware';
import cleanUser from './utils/cleanUser';

const router = express.Router();

router.get('/api/users', asyncMiddleware(async (req, res) => {
    const users = await db.User.find({});

    res.send(users);
}));

router.get('/api/users/:id', asyncMiddleware(async (req, res) => {
  const { id } = req.params;
  const user = await db.User.getUserById(id);

  res.send(user);
}));

// Registration user
router.post('/api/users', asyncMiddleware(async (req, res) => {
  const { session } = req;
  const { form } = req.body;
  
  const user = await db.User.register(form);
  const userId = user.getUserId();
  const cart = await db.Cart.createCart(userId);  

  session.user = { 
    userId,
    auth: false
  };

  res.redirect(307, '/api/auth');
}));

router.put('/api/users', asyncMiddleware(async (req, res) => {
  const { session } = req;
  const { form } = req.body;

  const user = await db.User.getUserById(session.user.userId);
  const updatedUser = await user.updateUserInfo(form);

  res.send({ user: cleanUser(updatedUser) });
}));
  
router.delete('/api/users/:id', asyncMiddleware(async (req, res, next) => {
  const { id } = req.params;
  const user = await db.User.findOneAndRemove({ _id: id });

  if (
    user && 
    req.session.user && 
    req.session.user.userId === user._id
  ) {
    delete req.session.user;
    delete req.session.remember;
  }

  res.send({ message: user ? true : false });
}));

export default router;