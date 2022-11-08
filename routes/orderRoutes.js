const express = require('express')
const router = express.Router()
const OrderController = require('../controllers/OrderController')
const auth = require('../auth')

// Create an order auth.verify,
router.post('/create', auth.verify, (request, response) => {
	const data = {
		isAdmin: auth.decode(request.headers.authorization).isAdmin,
		order: request.body,
		userId: auth.decode(request.headers.authorization).userId
		
	}

	OrderController.addOrder(data).then((result) => {
		response.send(result)
	})
})


// Retrieve all orders
router.get('/',auth.verify, (request, response) => {
	const data = {
		product: request.body,
		isAdmin: auth.decode(request.headers.authorization).isAdmin
	}

	OrderController.getAllOrders(data).then((result) => {
		response.send(result)
	})
})



// Approve an order (Admin only)
router.patch('/:orderId/approve', auth.verify, (request, response) => {
	let data = {
		order: request.body,
		isAdmin: auth.decode(request.headers.authorization).isAdmin
	}
	OrderController.approveOrder(request.params.orderId, data).then((result) => {
		response.send(result)
	})
})



// Update/approve  an order(Admin Only)
// router.patch('/:orderId/approve', auth.verify, (request, response) => {
// 	const data = {
// 		order: request.body,
// 		isAdmin: auth.decode(request.headers.authorization).isAdmin
// 	}

// 	OrderController.updateOrder(request.params.orderId, data).then((result) => {
// 		response.send(result)
// 	})
// })


// Retrieve Authenticated order
router.get('/auth_order', (request, response) => {
	// const data = {
	// 	isAdmin: auth.decode(request.headers.authorization).isAdmin,
	// 	order: request.body,
	// 	userId: auth.decode(request.headers.authorization).userId
	// }
	OrderController.getAuthOrder().then((result) => {
		response.send(result)
	})
})

// //create order
// 	router.post('/create', auth.verify, (request, response)=>{
// 	const data = {
// 		userId: request.body.userId,
// 		productId: request.body.productId,
// 		isAdmin: auth.decode(request.headers.authorization).isAdmin 			
// 	}
// 	userController.createOrder(data).then((result)=>{
// 		response.send(result)

// 	})
	
// })



module.exports = router