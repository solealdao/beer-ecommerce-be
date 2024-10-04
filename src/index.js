const http = require('http');
const fs = require('fs');
const path = require('path');
const productRoutes = require('./routes/productRoutes');

// Create HTTP server
const server = http.createServer((req, res) => {
	// Serve static files for product images
	if (req.url.startsWith('/products/')) {
		const filePath = path.join(__dirname, '..', 'public', req.url);
		const extname = path.extname(filePath).toLowerCase(); // Obtain the file extension

		const mimeTypes = {
			'.jpeg': 'image/jpeg',
			'.jpg': 'image/jpeg',
			'.png': 'image/png',
		};

		const contentType = mimeTypes[extname] || 'application/octet-stream'; // Default MIME type

		fs.readFile(filePath, (err, data) => {
			if (err) {
				res.writeHead(404, { 'Content-Type': 'text/plain' });
				res.end('Image not found');
			} else {
				res.writeHead(200, { 'Content-Type': contentType });
				res.end(data);
			}
		});
	} else {
		productRoutes(req, res);
	}
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
