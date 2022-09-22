const { exitsByUsername, getByUsername, saveUser } = require('../db/user.querys')
const { decodePassword, encodePassword } = require('../utils/bcrypt')
const { createToken } = require('../utils/jwt')

// --------------------------- Register ----------------------------------------
const validateUser = async (req, res, next) => {
  try {
    const { username } = req.body
    const existsUser = await exitsByUsername(username)
    if (existsUser) {
      res.render('layout/form', {
        loginForm: false,
        registerForm: true,
        hasNotify: true,
        style_text: 'text-danger',
        message: 'User already exists!!. Try again',
        link: '/login',
        link_text: 'hace account?, login!.',
        button_text: 'register'
      })
    }
    next()
  } catch (err) {
    next(err)
  }
}

const createUser = async (req, res, next) => {
  try {
    const { username, password } = req.body
    const encoded = encodePassword(password)
    await saveUser(username, encoded)
    res.render('layout/form', {
      loginForm: true,
      registerForm: false,
      hasNotify: true,
      style_text: 'text-success',
      message: 'user created!!.',
      link: '/register',
      link_text: `don't have accoutn? create one!!.`,
      button_text: 'login'
    })
  } catch (err) {
    next(err)
  }
}

const renderRegisterPage = (req, res, next) => {
  res.render('layout/form', {
    loginForm: false,
    registerForm: true,
    hasNotify: false,
    style_text: 'text-danger',
    message: 'User already exists!!. Try again',
    link: '/login',
    link_text: 'hace account?, login!.',
    button_text: 'register'
  })
}

// --------------------------- Login ----------------------------------------
const authenticate = async (req, res, next) => {
  try {
    const { username, password } = req.body
    const user = await getByUsername(username)
    if (!user) throw new Error('Problem while getting user from db')
    debugger
    if (user.username === username && decodePassword(password, user.password)) {
      const token = createToken({
        id: user.id,
        name: user.username
      })
      res.cookie('authorization', `bearer ${token}`).redirect('/')
    }
    res.render('layout/form', {
      loginForm: true,
      registerForm: false,
      hasNotify: true,
      style_text: 'text-danger',
      message: 'Wrong username or password',
      link: '/register',
      link_text: `don't have accoutn? create one!!.`,
      button_text: 'login'
    })
  } catch (err) {
    next(err)
  }
}

const renderLoginPage = (req, res, next) => {
  res.render('layout/form', {
    loginForm: true,
    registerForm: false,
    hasNotify: false,
    style_text: 'text-danger',
    message: 'Wrong username or password',
    link: '/register',
    link_text: `don't have accoutn? create one!!.`,
    button_text: 'login'
  })
}

module.exports = {
  validateUser,
  createUser,
  renderRegisterPage,
  authenticate,
  renderLoginPage
}

