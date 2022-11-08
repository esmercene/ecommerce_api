const User = require('../models/User')
const Product = require('../models/Product')
const Order = require('../models/Order')
const bcrypt = require('bcrypt')
const auth = require('../auth')




// // module to check if email exist
// module.exports.checkIfUserExists = (data) => {
// 	return User.find({username: data.username}).then((result) => {
// 		if(result.length >  0 ){
// 			return {message: "Username Already Exists"}
// 		}
// 		return {message: "Username is Available"}
// 	})
// }


// module to register new user
module.exports.register = (data)=> {
	return User.find({email: data.email}).then((result) => {
	    if(result.length >  0 ){
			return {message: "Username or Email Already Exists"}
		}

	let encrypted_password1 = bcrypt.hashSync(data.password1, 10)

	let new_user = new User({
		firstName: data.firstName,
		lastName: data.lastName,
		email: data.email,
		password1: encrypted_password1,
		mobileNo: data.mobileNumber,
		

	})

	return new_user.save().then((created_user, error) => {
		if(error){
			return false
		}

		return { message: 'New User Successfully Registered'}
	})
  })
}


// module to retrieve user details 
module.exports.getProfile = (data) => {

	return User.findById(data.userId).then(result => {

		// Makes the password not be included in the result
		result.password = "";

		// Returns the user information with the password as an empty string
		return result;

	});
};

// module.exports.getUserDetails = (user_id) => {
// 	return User.findById(user_id, {password: 0}).then((result, error) => {
// 		return result
// 	})
// }

// module for Admin Login
// module.exports.login = (data) => {
// 	return User.findOne({email: data.email}).then((result) => {
// 		const is_password_correct = bcrypt.compareSync(data.password, result.password)

// 		if (data.isAdmin){
// 			return {message: "Welcome Back Admin"}
// 		}
// 		let message = Promise.resolve({message: "You must be ADMIN to ACCESS this!"})
// 		return message.then((value) => {
// 			return value
//         })

// 		return { message: "Invalid Password!!!"}
// 	})

// }

// module to login user 
module.exports.login = (data) => {
	return User.findOne({email: data.email}).then((result) => {
		if (result == null){
			return {message: "User Doesn't Exist"}
		}

		const is_password_correct = bcrypt.compareSync(data.password1, result.password1)
		if(is_password_correct) {
			return { accessToken: auth.createAccessToken(result)}
		}

		return { message: "Invalid Password!!!"}
	})
}



// module to update/set user as admin (Admin only)
module.exports.updateUser = (user_Id, data) => {
	if(data.isAdmin){
		return User.findByIdAndUpdate(user_Id).then((result, error) => {
		if (error){
			return false
		    }

			result.isAdmin = data.isAdmin
			
			return result.save().then((updatedUser, error) => {
				if(error) {
					return false
	            }
			  return { message: `User with Id: ${user_Id} was Set as an Admin!`}
		    })
		})	
		}
		let message = Promise.resolve({message: "User must be ADMIN to update this"})
		return message.then((value) => {
			return value
        })		 	
}


// module to get all users
module.exports.getAllUsers = () => {
	return User.find({},{password: 0}).then((result) =>{
		return result
	})
}


// module to delete a user (Admin Only)
module.exports.deleteUser = (userId, data) => {
	if(data.isAdmin){
		
	return User.findByIdAndDelete(userId).then((deleteUser, error) =>{
		if (error){
			return false
		    }
		    return {message: `User with ${userId} was successfully deleted! `}
	})
  }
  let message = Promise.resolve({message: "User must be ADMIN to delete this"})
		return message.then((value) => {
			return value
    })
}


 // module to get all admin users
module.exports.getAllAdmin = (data) => {
	if(data.isAdmin){
	return User.find({isAdmin: true}).then((result) =>{
		return result

	})
   }

		let message = Promise.resolve({message: "User must be ADMIN to archive this"})
		return message.then((value) => {
			return value
    })
}













