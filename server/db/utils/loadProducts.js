import shop from '../api/shop';
import { Product } from '../models';
import log from '../../log';

export default async () => {
	const { products, latests, sales } = shop;
	const salesIds = sales.map(p => p.id);

	function newPrice(id) {
    return sales.find(product => product.id === id).price;
  }

  Product.remove({}, (err, result) => {
  	if (err) {
  		log.data('Shop isn\'t droped');
  		log.error(err.stack);
  		return;
  	}			

		log.data('Shop is droped');

		const responses = products.map(async (product) => {
			try {
				let loadedProduct = await Product.loadProduct(product);
				
				const { productId, price } = loadedProduct;
				
				if (latests.includes(productId))
					loadedProduct = await loadedProduct.updateProduct({ 
						group: 'latest' 
					});

				if (salesIds.includes(productId))
					loadedProduct = await loadedProduct.updateProduct({ 
						group: 'sale',
						price: newPrice(productId),
						oldPrice: price
					});
				
				return Promise.resolve(loadedProduct);
			} catch (e) {
				return Promise.reject(e);
			}
		});

		Promise.all(responses)
			.then(() => {
				log.data(`Products are loaded! All - ${responses.length}`);
			})
			.catch((e) => {
				log.data('Products aren\'t loaded!');
				log.error(e.stack);
				return;
			});
  });
};