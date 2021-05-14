const express = require('express')
const mongoose = require('mongoose')

const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/clean", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    //console.log("Database connection sucessfully.")
}).catch((error) => {
    console.log(error)
})

require('./models/User')
const UserController = require('./controllers/UserController')

app.use('/', UserController)
app.get('/', (req, res) => {
    res.status(200).json({ saudacao: "Ola" })
})

module.exports = app