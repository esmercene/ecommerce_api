const User = require('../models/User')
const Product = require('../models/Product')
const Order = require('../models/Order')
const bcrypt = require('bcrypt')
const auth = require('../auth')

// module to add an order
module.exports.addOrder = (data) => {
		if(data.isAdmin){
			return Promise.resolve({ message: "Admin cannot check out a product!"})
		}
		let new_order = new Order({
		userId: data.order.userId,
		productId: data.order.productId,
		quantity: data.order.quantity,
		totalAmount: data.order.totalAmount		
		
	 })

	 return new_order.save().then((new_order, error) => {
		if(error){
			return false
		 }
		 return { message: "New Order Successfully Created!"}
	  })
	}
		


// module to retrieve all orders(Admin only)
module.exports.getAllOrders = (data) => {
	if(data.isAdmin)
	return Order.find({}).then((result) =>{
		return result
	})
		let message = Promise.resolve({message: "User must be ADMIN to retrieve this!"})
		return message.then((value) => {
			return value
    })
}


// module to approve an order (Admin Only)
module.exports.approveOrder = (order_id, data) => {
	if(data.isAdmin){
	return Order.findByIdAndUpdate(order_id, {
		
		isApprove: data.order.isApprove
	}).then((approved_order, error) => {
		if(error) {
			return false
		}

		return { message: `Order has been approved!`}
	})
	} 
		let message = Promise.resolve({message: "User must be ADMIN to approve this order!"})
		return message.then((value) => {
			return value
        })
}



// module to get all authenticated order
module.exports.getAuthOrder = () => {
	// if(data.isAdmin){
	// 		return Promise.resolve({ message: "Admin cannot retrieve this!"})
	// 	}
	return Order.find({isApprove: true}).then((result) =>{
		return result
	})
}

//create order 
// module.exports.createOrder = async (data) => {
// 	let is_user_updated = await User.findById(data.userId).then((user) => {
// 		user.orders.push({
// 			productId: data.productId
// 		})
// 		return user.save().then((updated_user, error) => {
// 			if(error){
// 				return false
// 			}
// 			return true
// 		}) 
// 	})
// 	let is_product_updated = await Product.findById(data.productId).then((product) => {
// 		product.orders.push({
// 			userId: data.userId
// 		})
// 		return product.save().then((updated_product, error) => {
// 			if(error){
// 				return false
// 			}
// 			return true
// 		}) 
// 	})
// 	if(is_user_updated && is_product_updated){
// 		return {
// 			message: 'User added item to cart!'
// 		}
// 	}
// 	return {
// 		message: 'Something went wrong.'
// 	}
// }

