const express = require('express')

const Product = require('../models/product')

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.find().select('name price _id')
    const response = {
      count: products.length,
      products: products.map(product => {
        return {
          name: product.name,
          price: product.price,
          _id: product._id,
          request: {
            type: 'GET',
            url: process.env.URL + '/products/' + product._id
          }
        }
      })
    }
    res.status(200).json(response)
  } catch(err) {
    res.status(500).json(err)
  }
})

router.get('/:id', async (req, res, next) => {
  const id = req.params.id
  try {
    const product = await Product.findOne({ _id: id })
      .select('name price _id')
    const response = {
      name: product.name,
      price: product.price,
      _id: product._id,
      request: {
        type: "GET",
        url: process.env.URL + '/products'
      }
    }
    res.status(200).json(response)
  } catch(err) {
    res.status(500).json(err)
  }
})

router.post('/', async (req, res, next) => {
  const product = new Product(req.body)
  try {
    const savedProduct = await product.save()
    const response = {
      message: 'Product saved',
      product: {
        name: savedProduct.name,
        price: savedProduct.price,
        _id: savedProduct._id
      },
      request: {
        type: 'GET',
        url: process.env.URL + '/products/' + savedProduct._id
      }
    }
    res.status(201).json(response)
  }
  catch(err) {
    res.status(500).json(err)
  }
})

router.patch('/:id', async (req, res, next) => {
  const id = req.params.id
  try {
    const updatedProduct = await Product.updateOne(
      { _id: id }, { $set: req.body }
    )
    const response = {
      message: 'Product updated',
      request: {
        type: 'GET',
        url: process.env.URL + '/products/' + id
      }
    }
    res.status(200).json(response)
  } catch(err) {
    res.status(500).json(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  const id = req.params.id
  try {
    const deletedPost = await Product.deleteOne({ _id: id })
    const response = {
      message: 'Product deleted',
      request: {
        type: 'POST',
        url: process.env.URL + '/products',
        body: {
          name: 'String',
          price: 'Number'
        }
      }
    }
    res.status(200).json(response)
  } catch(err) {
    res.status(500).json(err)
  }
})

module.exports = router