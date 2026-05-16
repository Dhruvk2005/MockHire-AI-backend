const express = require('express')

const usercontroller = require('../controllers/usercontroller')
const router = express.Router()

router.post('/signup', usercontroller.UserSignupcontroller)
router.post('/login', usercontroller.userLogin)
module.exports = router