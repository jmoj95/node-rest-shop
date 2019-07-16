const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const User = require('../models/user')

const router = express.Router()

router.post('/signup', async (req, res, next) => {
  try {
    const checkUser = await User.find({ email: req.body.email })
    if (checkUser.length > 0) {
      return res.status(409).json({
        message: 'Email exists'
      })
    }
  } catch (err) {
    res.status(500).json(err)
  }
  bcrypt.hash(req.body.password, 10, async (err, hash) => {
    if (err) {
      return res.status(500).json({ error: err })
    }
    const user = new User({
      email: req.body.email,
      password: hash
    })
    try {
      const savedUser = await user.save()
      console.log(savedUser)
      const response = {
        message: 'User created'
      }
      res.status(201).json(response)
    } catch(err) {
      res.status(500).json(err)
    }
  })
})

router.delete('/:id', async (req, res, next) => {
  try {
    const deletedUser = await User.remove({ _id: req.params.id })
    res.status(200).json({
      message: 'User deleted'
    })
  } catch(err) {
    res.status(500).json(err)
  }
})

module.exports = router