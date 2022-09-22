const { Router } = require('express')
const {
  validateUser,
  createUser,
  renderRegisterPage,
  authenticate,
  renderLoginPage
} = require('../controllers/auth.controller')
const router = Router()
// ----------------------------------------------------------- //

router.get('/register', renderRegisterPage)

router.post('/register', validateUser, createUser)

router.get('/login', renderLoginPage)

router.post('/login', authenticate)

router.get('/logout', (req, res, next) => {
  res.clearCookie('authorization')
  res.redirect('/login')
})

module.exports = router
