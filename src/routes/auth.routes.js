const { Router } = require('express')
const {
  authenticate,
  checkUsername,
  renderLoginPage,
  renderSinginPage,
  saveUser
} = require('../controllers/auth.controller')

const router = Router()

router.get('/login', renderLoginPage)

router.post('/login', checkUsername, authenticate)

router.get('/register', renderSinginPage)

router.post('/register', checkUsername, saveUser)

module.exports = router
