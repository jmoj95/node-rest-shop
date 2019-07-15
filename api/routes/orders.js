const express = require('express')

const router = express.Router()

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Orders were fetched'
  })
})

router.get('/:id', (req, res, next) => {
  res.status(200).json({
    message: 'Order details',
    id: req.params.id
  })
})

router.post('/', (req, res, next) => {
  const order = {
    productId: req.body.productId,
    quantity: req.body.quantity
  }
  res.status(201).json({
    message: 'Order was created',
    order
  })
})

router.delete('/:id', (req, res, next) => {
  res.status(200).json({
    message: 'Order deleted',
    id: req.params.id
  })
})

module.exports = router