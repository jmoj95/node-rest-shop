const express = require('express')

const router = express.Router()

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Handling GET requests to /products'
  })
})

router.get('/:id', (req, res, next) => {
  const id = req.params.id
  if (id === 'special') {
    res.status(200).json({
      message: 'You discovered the special ID',
      id
    })
  } else {
    res.status(200).json({
      message: 'You passed an ID',
      id
    })
  }
})

router.post('/', (req, res, next) => {
  const product = {
    name: req.body.name,
    price: req.body.price
  }
  res.status(201).json({
    message: 'Handling POST requests to /products',
    product
  })
})

router.patch('/:id', (req, res, next) => {
  res.status(200).json({
    message: 'Updated product.'
  })
})

router.delete('/:id', (req, res, next) => {
  res.status(200).json({
    message: 'Deleted product.'
  })
})

module.exports = router