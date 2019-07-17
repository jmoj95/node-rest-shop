const express = require('express')

const  OrdersController = require('../controllers/orders')

const checkAuth = require('../middlewares/check-auth')

const router = express.Router()

router.get('/', checkAuth, OrdersController.find_all)

router.get('/:id', checkAuth, OrdersController.find_by_id)

router.post('/', checkAuth, OrdersController.add)

router.delete('/:id', checkAuth, OrdersController.delete_by_id)

module.exports = router