const Product = require('../models/Product')
const Order = require('../models/Order')
const auth = require('../auth')
const bcrypt = require('bcrypt')

// module to create a product
module.exports.createProduct = (data) => {
	if(data){
		let new_product = new Product({
		name: data.product.name,
		description: data.product.description,
		price: data.product.price		
		
	 })

	 return new_product.save().then((new_product, error) => {
		if(error){
			return false
		 }
		 return { message: "New Product Successfully Created!"}
	  })
	}
		// let message = Promise.resolve({message: "User must be ADMIN to create this!"})
		// return message.then((value) => {
		// 	return value
  //   })
}

// module to get all products
module.exports.getAllProducts = () => {
	return Product.find({}).then((result) =>{
		return result
	})
}


// module to get all active products
module.exports.getAllActive = () => {
	return Product.find({isActive: true}).then((result) =>{
		return result
	})
}

// module to get single product
module.exports.getProduct = (productId) => {
	return Product.findById(productId).then((result) =>{
		return result
	})
}

// module to update a product(Admin only)
module.exports.updateProduct = (product_id, data) => {
	if(data){
	return Product.findByIdAndUpdate(product_id, {
		name: data.product.name,
		description: data.product.description,
		price: data.product.price,
		isActive: data.product.isActive
	}).then((updated_product, error) => {
		if(error) {
			return false
		}

		return { message: `Product with id: ${product_id}  has been updated successfully!`}
	})
	} 
		// let message = Promise.resolve({message: "User must be ADMIN to update this product!"})
		// return message.then((value) => {
		// 	return value
  //       })
}

// module to archive a product
module.exports.archiveProduct = (product_id, data) => {
	if(data){
	return Product.findByIdAndUpdate(product_id, {isActive: false}).then((archive, error) => {
		if(error) {
			return false
		}

		return { message: `Product with id: ${product_id} has been archived!`}
	})
	}
		// let message = Promise.resolve({message: "User must be ADMIN to archive this"})
		// return message.then((value) => {
		// 	return value
  //   })
}



// module to activate(Admin only)
module.exports.activateProduct = (product_id, data) => {
	if(data){
	return Product.findByIdAndUpdate(product_id, {isActive: true}).then((archive, error) => {
		if(error) {
			return false
		}

		return { message: `Product with id: ${product_id} has been activated!`}
	})
	}
		// let message = Promise.resolve({message: "User must be ADMIN to archive this"})
		// return message.then((value) => {
		// 	return value
  //   })
}


