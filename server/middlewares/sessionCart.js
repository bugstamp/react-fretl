// import boom from 'boom';

import db from '../db';
import asyncMiddleware from './asyncMiddleware';

export default asyncMiddleware(async (req, res, next) => {
  if (!req.user || !req.user.auth) {
    if (!req.session.cart)
      req.session.cart = [];

    async function isItemExist(productId) {
      return req.session.cart.some(item => item.productId === productId);
    }

    async function getItem(productId) {
      return req.session.cart.find(item => item.productId === productId);
    }

    async function removeItem(productId) {
      return req.session.cart.filter(item => item.productId !== productId);
    }

    async function getItems() {
      const results = req.session.cart.map(async (item) => {
        try {
          const product = await db.Product.getProductById(item.productId);

          return Promise.resolve({ 
            ...product, 
            order: item.order 
          });
        } catch (e) {
          return Promise.reject(e);
        }
      });
      const response = await Promise.all(results); 

      return response;
    }

    async function updateItem(productId, order) {
      return req.session.cart.map(item => {
        if (item.productId === productId)
          return { 
            ...item, 
            order: item.order + order 
          };

        return item;
      });
    }

    async function updateItemOrder(productId, type) {
      if (type === 'INCREMENT') {
        return req.session.cart.map(item => {
          if (item.productId === productId)
            return { 
              ...item, 
              order: item.order + 1
            };

          return item;
        });
      } else if (type === 'DECREMENT') {
        return req.session.cart.map(item => {
          if (item.productId === productId) {
            if (item.order > 1)
              return { 
                ...item, 
                order: item.order - 1
              };
           
            return item;
          }

          return item;
        });
      }

      return req.session.cart; 
    }

    switch (req.method) {
      case 'GET': {
        try {
          const { cart } = req.session;

          if (cart.length === 0)
            return res.send(cart);

          const cartItems = await getItems();

          return res.send(cartItems)
        } catch (e) {
          throw (e);
        }
      }
      case 'POST': {
        try {
          const { productId, order } = req.body;
          
          if (await isItemExist(productId)) {
            req.session.cart = await updateItem(productId, order);
          } else {
            req.session.cart = [ 
              ...req.session.cart, 
              { 
                productId, 
                order 
              } 
            ];
          }

          const product = await db.Product.getProductById(productId);
          const item = await getItem(productId);

          return res.send({ 
            ...product, 
            order: item.order 
          });
        } catch (e) {
          throw e;
        } 
      }
      case 'PUT': {
        try {
          const { productId, type } = req.body;

          req.session.cart = await updateItemOrder(productId, type);
          const item = await getItem(productId);
          
          return res.send(item); 
        } catch (e) {
          throw e;
        }
      }
      case 'DELETE': {
        try {
          let { id } = req.params;
          id = Number(id)

          req.session.cart = await removeItem(id);
          const result = !await isItemExist(id);
          
          return res.send({ result });       
        } catch (e) {
          throw e;
        }
      }
      default: 
        return next();
    }
  }

  next();
});