const mongoose = require('mongoose')

const user_schema = new mongoose.Schema({
	firstName: {
		type: String,
		required: [true, 'First Name is Required']
	},
	lastName: {
		type: String,
		required: [true, 'Last Name is Required']
	},
	email: {
		type: String,
		required: [true, 'Email is Required']
	},
	password1: {
		type: String,
		required: [true, 'Password is Required']
	},
	mobileNumber: {
		type: String
	},
	isAdmin: {
		type: Boolean,
		default: false
	},
	// orderProduct: [
	// 	{
	// 		productId: {
	// 				type: String,
	// 			required: [true, 'Product ID is Required']
	// 	    },
	// 	    orderOn: {
	// 			    type: Date,
	// 			  default: new Date()
	// 		},
	// 		status: {
	// 				type: String,
	// 			 default: "Pending"
	// 		}
			
	// 	}
	// ]

})
module.exports = mongoose.model('User', user_schema)