const express = require('express')
const mongoose = require('mongoose')

const User = mongoose.model('User')

const Router = express.Router()

Router.post('/user', async(req, res) => {
    const { name, email, password } = req.body
    if (name == "" || email == "" || password == "") {
        res.status(400).json({ error: "Invalid arguments." })
    } else {
        const newUser = new User({
            name,
            email,
            password
        })
        try {
            await newUser.save()
            res.status(200).json({
                email: newUser.email
            })
        } catch (error) {
            console.log(error)
            res.status(400).json({
                error: "An error has ocurred.",
                email: newUser.email
            })
        }
    }
})

module.exports = Router