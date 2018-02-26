import boom from 'boom';

import mongoose from '../mongoose';

const productSchema = new mongoose.Schema({
	productId: {
		type: Number,
		unique: true,
		require: true
	},
	name: {
		type: String,
		require: true
	},
	category: {
		type: String,
		require: true
	},
	group: {
		type: String
	},
	price: {
		type: Number,
		require: true
	},
	oldPrice: {
		type: Number,
	},
	value: {
		type: Number,
		require: true
	},
	unit: {
		type: String,
		require: true
	},
	img: {
		small: {
			type:String,
			require: true
		},
		middle: {
			type:String,
			require: true
		},
		large: {
			type:String,
			require: true
		}
	},
	description: String,
	calories: String,
	remark: String
});

productSchema.methods.updateProduct = async function(values) {
	try {
		const product = await Product.findOneAndUpdate(
			{ productId: this.productId },
			{ ...values },
			{ 'new': true }
		);
		
		return product;
	} catch(e) {
		throw e;
	}
}

productSchema.statics.isProductExist = async function(productId) {
	try {
		if (!await Product.findOne({ productId }))
			return false;

		return true;
	} catch (e) {
		throw e;
	}
}

productSchema.statics.loadProduct = async function(product) {
	try {
		const newProduct = await Product.create({ 
			...product, 
			productId: product.id 
		});

		return newProduct;
	} catch(e) {
		throw e;
	}
}

productSchema.statics.getProductsBy = async function(collection) {
	try {
		const	products = await Product.find(collection);

		return products;
	} catch (e) {
		throw e;
	}
}

productSchema.statics.getProductById = async function(productId) {
	try {
		if (!await this.isProductExist(productId))
			throw boom.notFound('Продукт не найден');
		
		const product = await Product.find({ productId });
		
		return product[0].toObject();
	} catch (e) {
		throw e;
	}
}

const Product = mongoose.model('Product', productSchema);

export default Product;