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
        // pass out
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid User Data')
    }
})

const loginUser = asyncHandler(async (req, res) => {
    //destructure user input data
    const {email, password } = req.body

    // Check if user exists
    const user = await User.findOne({email})

    // first condition passes if user exists
    // second condition checks user input password with cipher
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
        
    } else {
        res.status(400)
        throw new Error('Wrong email or password')
    }
})

const getMe = asyncHandler(async (req, res) => {
    // getting user from authMiddleware
    res.status(200).json(req.user)
})

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
}