const express = require('express')
const multer = require('multer')

const Product = require('../models/product')

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads')
  },
  filename(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter
})

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.find().select('name price image _id')
    const response = {
      count: products.length,
      products: products.map(product => {
        return {
          name: product.name,
          price: product.price,
          image: product.image,
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
      .select('name price image _id')
    const response = {
      name: product.name,
      price: product.price,
      image: product.image,
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

router.post('/', upload.single('image'), async (req, res, next) => {
  console.log(req.file);
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    image: req.file.path
  })
  try {
    const savedProduct = await product.save()
    const response = {
      message: 'Product saved',
      product: {
        name: savedProduct.name,
        price: savedProduct.price,
        image: savedProduct.image,
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