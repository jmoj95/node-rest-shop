const Product = require('../models/product')

exports.find_all = async (req, res, next) => {
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
            url: 'products/' + product._id
          }
        }
      })
    }
    res.status(200).json(response)
  } catch(err) {
    res.status(500).json(err)
  }
}

exports.find_by_id = async (req, res, next) => {
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
        url: 'products'
      }
    }
    res.status(200).json(response)
  } catch(err) {
    res.status(500).json(err)
  }
}

exports.add = async (req, res, next) => {
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
        url: 'products/' + savedProduct._id
      }
    }
    res.status(201).json(response)
  }
  catch(err) {
    res.status(500).json(err)
  }
}

exports.update_by_id = async (req, res, next) => {
  const id = req.params.id
  try {
    const updatedProduct = await Product.updateOne(
      { _id: id }, { $set: req.body }
    )
    const response = {
      message: 'Product updated',
      request: {
        type: 'GET',
        url: 'products/' + id
      }
    }
    res.status(200).json(response)
  } catch(err) {
    res.status(500).json(err)
  }
}

exports.delete_by_id = async (req, res, next) => {
  const id = req.params.id
  try {
    const deletedPost = await Product.deleteOne({ _id: id })
    const response = {
      message: 'Product deleted',
      request: {
        type: 'POST',
        url: 'products',
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
}