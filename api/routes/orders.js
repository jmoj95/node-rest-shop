const express = require('express')

const checkAuth = require('../middlewares/check-auth')

const Order = require('../models/order')
const Product = require('../models/product')

const router = express.Router()

router.get('/', checkAuth, async (req, res, next) => {
  try {
    const orders = await Order.find().select('product quantity _id')
      .populate('product', 'name price')
    const response = {
      count: orders.length,
      products: orders.map(order => {
        return {
          product: order.product,
          quantity: order.quantity,
          id: order._id,
          request: {
            type: 'GET',
            url: process.env.URL + '/orders/' + order._id
          }
        }
      })
    }
    res.status(200).json(response)
  } catch(err) {
    res.status(500).json(err)
  }
})

router.get('/:id', checkAuth, async (req, res, next) => {
  const id = req.params.id
  try {
    const order = await Order.findById(id).select('product quantity _id')
      .populate('product', 'name price')
    const response = {
      product: order.product,
      quantity: order.quantity,
      _id: order._id,
      request: {
        type: 'GET',
        url: process.env.URL + '/orders'
      }
    }
    res.status(200).json(response)
  } catch(err) {
    res.status(500).json(err)
  }
})

router.post('/', checkAuth, async (req, res, next) => {
  try {
    const product = await Product.findById(req.body.productId)
      .select('name price _id')
    const order = new Order({
      product,
      quantity: req.body.quantity
    })
    const savedOrder = await order.save()
    const response = {
      message: 'Order saved',
      order: {
        product: savedOrder.product,
        quantity: savedOrder.quantity,
        _id: savedOrder._id
      },
      request: {
        type: 'GET',
        url: process.env.URL + '/orders/' + savedOrder._id
      }
    }
    res.status(201).json(response)
  } catch(err) {
    res.status(500).json(err)
  }
})

router.delete('/:id', checkAuth, async (req, res, next) => {
  const id = req.params.id
  try {
    const deletedOrder = await Order.deleteOne({ _id: id })
    const response = {
      message: 'Order deleted',
      request: {
        type: 'POST',
        url: process.env.URL + '/orders',
        body: {
          productId: 'String',
          quantity: 'Number'
        }
      }
    }
    res.status(200).json(response)
  } catch(err) {
    res.status(500).json(err)
  }
})

module.exports = router