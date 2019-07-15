const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Header',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  if (req.method === 'OPTIONS') {
    res.header(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, PATCH, DELETE'
    )
    return res.status(200).json({})
  }
  next()
})

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