const mongoose = require('mongoose')

const product_schema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Product name is Required.']
	},
	description: {
		type: String,
		required: [true, 'Description is Required']
	},
	price: {
		type: Number,
		required: [true, 'Price is Required']
	},
	isActive: {
		type: Boolean,
		default: true
	},
	createdOn: {
		type: Date,
		default: new Date()
	}
})

module.exports = mongoose.model('Product', product_schema)