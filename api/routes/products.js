const express = require('express')

const Product = require('../models/products')

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.find()
    res.status(200).json(products)
  } catch(err) {
    res.status(500).json(err)
  }
})

router.get('/:id', async (req, res, next) => {
  const id = req.params.id
  try {
    const product = await Product.find({ _id: id })
    res.status(200).json(product)
  } catch(err) {
    res.status(500).json(err)
  }
})

router.post('/', async (req, res, next) => {
  const product = new Product(req.body)
  try {
    const savedProduct = await product.save()
    res.status(201).json(savedProduct)
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
    res.status(200).json(updatedProduct)
  } catch(err) {
    res.status(500).json(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  const id = req.params.id
  try {
    const deletedPost = await Product.deleteOne({ _id: id })
    res.status(200).json(deletedPost)
  } catch(err) {
    res.status(500).json(err)
  }
})

module.exports = router