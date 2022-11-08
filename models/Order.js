const mongoose = require('mongoose')


const order_schema = new mongoose.Schema({
	userId: {
		type: String,
	    required: [true, 'User ID is Required']
		 },
	productId: {
	    type: String,
	    required: [true, 'Product ID is Required']
		},
	quantity: {
		 type: Number
	    },
    totalAmount: {
    	type: Number
    },
    isApprove: {
    	type: Boolean,
    	default: false
    },
    purchaseOn: {
		type: Date,
		default: new Date()
    }
})
module.exports = mongoose.model('Order', order_schema)