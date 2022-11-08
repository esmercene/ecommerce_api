const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const cors = require('cors')
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
const orderRoutes = require('./routes/orderRoutes')


// Server Setup
const app = express()
const port = process.env.PORT || 8008


// Mongo DB Connection
mongoose.connect(`mongodb+srv://esmercene:${process.env.MONGODB_PASSWORD}@cluster0.t5xp9id.mongodb.net/e-commerce-api?retryWrites=true&w=majority`, 
{
	useNewUrlParser: true,
	useUnifiedTopology: true
})
let db = mongoose.connection

// db.on('error', () => console.error("Connection error"))
db.once('open', () => console.log("Connected to MongodDB"))


// To avoid CORS errors when trying to send request to our server
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Routes Handling
app.use('/users', userRoutes)
app.use('/products', productRoutes)
app.use('/orders', orderRoutes)


// Server Listening
app.listen(port, () => console.log(`API is now running on localhost: ${port}`))












