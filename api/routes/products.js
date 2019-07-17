const express = require('express')
const multer = require('multer')

const ProductsController = require('../controllers/products')

const checkAuth = require('../middlewares/check-auth')

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

router.get('/', ProductsController.find_all)

router.get('/:id', ProductsController.find_by_id)

router.post('/', upload.single('image'), checkAuth, ProductsController.add)

router.patch('/:id', checkAuth, ProductsController.update_by_id)

router.delete('/:id', checkAuth, ProductsController.delete_by_id)

module.exports = router