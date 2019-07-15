const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(morgan('dev'))

const productRoutes = require('./api/routes/products')
app.use('/products', productRoutes)

const orderRoutes = require('./api/routes/orders')
app.use('/orders', orderRoutes)

app.use((req, res, next) => {
  const error = new Error('Not found')
  error.status = 404
  next(error)
})

app.use((err, req, res, next) => {
  const status = err.status || 500
  res.status(status).json({
    error: {
      status,
      message: err.message
    }
  })
})

module.exports = app