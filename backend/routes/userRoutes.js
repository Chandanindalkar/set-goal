const express = require('express')
const router = express.Router()

const {
  registerUser,
  loginUser,
  getMe,
  
} = require('../controller/userController')

// const {protect} = require(''); //add auth middleware

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', getMe)

module.exports = router