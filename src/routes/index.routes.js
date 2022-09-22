const { Router } = require('express')
const { isAuthenticate } = require('../utils/jwt')
const router = Router()

router.get('/', isAuthenticate, (req, res) => {
  res.render('index')
})

module.exports = router