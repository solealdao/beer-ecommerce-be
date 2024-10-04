const productsModule = require('../database/products');
const products = productsModule.default || productsModule;
const stockPrices =
	require('../database/stock-price').default ||
	require('../database/stock-price');

// Handler to return all products as JSON
const getAllProducts = (req, res) => {
	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify(products));
};

// Handler to return stock and price for a specific SKU
const getProductStockAndPrice = (req, res) => {
	const sku = req.url.split('/').pop();
	const productStock = stockPrices[sku];

	if (productStock) {
		const response = {
			price: (productStock.price / 100).toFixed(2), // Convert price from cents to dollars
			stock: productStock.stock,
		};

		res.writeHead(200, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify(response));
	} else {
		res.writeHead(404, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify({ error: 'Product not found' }));
	}
};

module.exports = {
	getAllProducts,
	getProductStockAndPrice,
};
