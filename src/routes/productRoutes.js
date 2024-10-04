const productController = require('../controllers/productController');

// Allowed origins for development and testing environments
const allowedOrigins = ['http://localhost:3000'];

const productRoutes = (req, res) => {
	// Add CORS headers
	const origin = req.headers.origin;
	if (allowedOrigins.includes(origin)) {
		res.setHeader('Access-Control-Allow-Origin', origin);
	}
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, OPTIONS, PUT, DELETE'
	);
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

	// Handle OPTIONS method (preflight requests)
	if (req.method === 'OPTIONS') {
		res.writeHead(204);
		res.end();
		return;
	}

	// Route for fetching all products
	if (req.url === '/api/products' && req.method === 'GET') {
		productController.getAllProducts(req, res);

		// Route for fetching stock and price by SKU
	} else if (req.url.startsWith('/api/stock-price/') && req.method === 'GET') {
		const sku = req.url.split('/').pop();
		if (sku) {
			productController.getProductStockAndPrice(req, res);
		} else {
			res.writeHead(400, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({ message: 'Bad Request: SKU is missing' }));
		}
	} else {
		res.writeHead(404, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify({ message: 'Not Found' }));
	}
};

module.exports = productRoutes;
