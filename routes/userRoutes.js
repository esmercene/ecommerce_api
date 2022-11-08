const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const auth = require('../auth')


// // Check if email exists
// router.post('/check-user', (request, response) => {
// 	UserController.checkIfUserExists(request.body).then((result) => {
// 		response.send(result)
// 	})
// })


// User Registration/Create user routes
router.post('/register', (request, response) => {
	const data = {
		firstName: request.body.firstName,
		lastName: request.body.lastName,
		email: request.body.email,
		password1: request.body.password,
		mobileNumber: request.body.mobileNumber
		
	}
	UserController.register(request.body).then((result) => {
		response.send(result)
	})
})


// Get user details from token
router.get("/details", auth.verify, (request, response) => {

	// Retrieves the user data from the token
	const user_data = auth.decode(request.headers.authorization);

	// Provides the user's ID for the getProfile controller method
	UserController.getProfile({userId : user_data.id}).then(result => response.send(result));

});

// Retrieve user details
// router.get('/:id/details',  (request, response) =>  {
// 	UserController.getUserDetails(request.params.id).then((result) => { response.send(result)

// 	})
// })

// Admin Login
// router.get('/admin', auth.verify, (request, response) => {
// 	const data = {
// 		user: request.body,
// 		isAdmin: auth.decode(request.headers.authorization).isAdmin
// 	}
// 	UserController.login(request.body).then((result) => {
// 		response.send(result)
// 	})
// })

// Login User / User Authentication
router.post('/login', (request, response) => {
	UserController.login(request.body).then((result) => {
		response.send(result)
	})
})

// Update a user/set user as admin(Admin Only)
router.patch('/:userId/update', auth.verify, (request, response) => {
	const data = {
		user: request.body,
		isAdmin: auth.decode(request.headers.authorization).isAdmin
	}

	UserController.updateUser(request.params.userId, data).then((result) => {
		response.send(result)
	})
})

// Get all user
router.get('/', (request, response) => {
	UserController.getAllUsers().then((result) => {
		response.send(result)
	})
})


// Delete a task
router.delete('/:userId/delete',auth.verify, (request, response) => {
	const data = {
		isAdmin: auth.decode(request.headers.authorization).isAdmin
	}

	UserController.deleteUser(request.params.userId, data).then((result) => {
		response.send(result)
	})
})

// Retrieve all Admin Users 
router.get('/admin_users',auth.verify, (request, response) => {
	const data = {
		isAdmin: auth.decode(request.headers.authorization).isAdmin
	}

	UserController.getAllAdmin(request.params.userId, data).then((result) => {
		response.send(result)
	})
})


module.exports = router