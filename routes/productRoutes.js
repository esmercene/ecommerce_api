const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/ProductController')
const auth = require('../auth')
const bcrypt = require('bcrypt')

// Create a product auth.verify,
router.post('/create',  (request, response) => {
	const data = {
		product: request.body,
		// isAdmin: auth.decode(request.headers.authorization).isAdmin
	}

	ProductController.createProduct(data).then((result) => {
		response.send(result)
	})
})


// Get all products
router.get('/', (request, response) => {
	ProductController.getAllProducts().then((result) => {
		response.send(result)
	})
})


// Retrieve all Active Products
router.get('/active', (request, response) => {
	ProductController.getAllActive().then((result) => {
		response.send(result)
	})
})

// Retrieve single product
router.get('/:productId', (request, response) => {
	ProductController.getProduct(request.params.productId).then((result) => {
		response.send(result)
	})
})


// Update a product (Admin only)auth.verify, 
router.patch('/:productId/update',  (request, response) => {
	let data = {
		product: request.body,
		// isAdmin: auth.decode(request.headers.authorization).isAdmin
	}
	ProductController.updateProduct(request.params.productId, data).then((result) => {
		response.send(result)
	})
})

// Archive a product (Admin Only)auth.verify,
router.patch('/:productId/archive',  (request, response) => {
	const data = {
		product: request.body,
		// isAdmin: auth.decode(request.headers.authorization).isAdmin
	}
	ProductController.archiveProduct(request.params.productId, data).then((result) => {
		response.send(result)
	})
})


// activate/deactivate a product (Admin only)auth.verify, 
router.patch('/:productId/activate',  (request, response) => {
	let data = {
		product: request.body,
		// isAdmin: auth.decode(request.headers.authorization).isAdmin
	}
	ProductController.activateProduct(request.params.productId, data).then((result) => {
		response.send(result)
	})
})





module.exports = router