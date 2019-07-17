const express = require('express')

const UsersController = require('../controllers/users')

const checkAuth = require('../middlewares/check-auth')

const router = express.Router()

router.post('/signup', UsersController.signup)

router.post('/login', UsersController.login)

router.delete('/:id', checkAuth, UsersController.delete)

module.exports = router