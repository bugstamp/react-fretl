import boom from 'boom';

import mongoose from '../mongoose';
import db from '../';

const itemSchema = new mongoose.Schema({
  productId: Number,
  order: Number,
  default: []
})

const cartSchema = new mongoose.Schema({
  owner: {
    type: String,
    unique: true,
    required: true
  },
  items: [itemSchema]
});

cartSchema.methods.isItemExist = function(productId) {
  if (this.items.length === 0)
    return false;

  return this.items.some(item => item.productId === productId);
}

cartSchema.methods.getItem = async function(productId) {
  return this.items.find(item => item.productId === productId);
}

cartSchema.methods.getItems = async function() {
  try {
    if (this.items.length === 0)
      return [];

    const results = this.items.map(async (item) => {
      try {
        const product = await db.Product.getProductById(item.productId);

        return Promise.resolve({ 
          ...product, 
          order: item.order 
        });
      } catch (e) {
        return Promise.reject(e)
      };
    });

    const items = await Promise.all(results);

    return items;
  } catch (e) {
    throw e;
  }
}

async function changeItemOrder(cartId, productId, order) {
  const updatedCart  = await Cart.findOneAndUpdate(
    { _id: cartId, 'items.productId': productId },
    { $inc: { 'items.$.order': order } },
    { 'new': true,
      'projection': { 'items': { $elemMatch: { 'productId': productId } } }
    }
  );

  return updatedCart;
}

cartSchema.methods.addItem = async function(productId, order) {
  try {
    let cart;
    
    if (this.isItemExist(productId)) {
      cart  = await changeItemOrder(this._id, productId, order);
    } else {
      cart = await Cart.findOneAndUpdate(
        { _id: this._id },
        { $push: { items: { productId, order } } },
        { 'new': true,
          'projection': { 'items': { $elemMatch: { 'productId': productId } } }
        }
      );
    }

    return cart.items[0].toObject();
  } catch (e) {
    throw e;
  }
}

cartSchema.methods.updateItem = async function(productId, type) {
  try {
    const item = await this.getItem(productId);
    
    let count = 0;

    if (type === "INCREMENT") {
      count = 1;
    } else if (type === "DECREMENT" && item.order > 1) {
      count = -1;
    }

    const cart = await changeItemOrder(this._id, productId, count)

    return cart.items[0].toObject();          
  } catch (e) {
    throw e;
  }
}

cartSchema.methods.removeItem = async function(productId, type) {
  try {
    const cart = await Cart.findOneAndUpdate(
      { _id: this._id },
      { $pull: { 'items': { 'productId': productId } } },
      { 'new': true,
        'projection': { 'items': { $elemMatch: { 'productId': productId } } } 
      });

    return cart.items.length === 0;
  } catch (e) {
    throw e;
  }
}

cartSchema.statics.createCart = async function(userId) {
  try {
    const cart = await Cart.create({ owner: userId });

    return cart;
  } catch (e) {
    throw e;
  }
}

cartSchema.statics.getCart = async function(userId) {
  try {
    const cart = await Cart.findOne({ owner: userId });

    return cart;
  } catch (e) {
    throw e;
  }
}

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;