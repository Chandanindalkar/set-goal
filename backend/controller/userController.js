const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      res.status(400)
      throw new Error('Please add all fields')
    }

    // Check if user exists
    const userExists = await User.findOne({ email })
    if (userExists) {
        throw new Error('User already exists')
    }

    //password hash
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)

    // creating a user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(400)
        throw new Error('Invalid User Data')
    }
})

const loginUser = asyncHandler(async (req, res) => {
    res.json({message: 'Login User'})
})

const getMe = asyncHandler(async (req, res) => {
    res.json({message: 'user data display'})
})

module.exports = {
    registerUser,
    loginUser,
    getMe,
}