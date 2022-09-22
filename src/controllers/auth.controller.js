const { exitsByUsername, getByUsername } = require('../db/user.querys')
const { decodePassword, encodePassword } = require('../utils/bcrypt')
const { createToken } = require('../utils/jwt')
// model
const { User } = require('../models/user.model')

const authPage = {
  form_accion: '/login',
  form_title: 'Login',
  form_error: false, // <-
  form_style_text: '', // <-
  form_error_message: '', // <-
  form_link: '/register', // <-
  form_link_text: `don't have an account? create!.`
}


const renderLoginPage = (req, res) => {
  res.status(200).render('layout/form', authPage)
}

const checkUsername = async (req, res, next) => {
  const { username } = req.body
  if (exitsByUsername(username)) {
    next()
  }
  authPage.form_error = true
  authPage.form_style_text = 'text-danger fw-bold'
  req.url === '/register'
    ? authPage.form_error_message = 'user already exists!.'
    : authPage.form_error_message = 'user or passord incorrect!.'
  res.render('layout/form', authPage)
}

const authenticate = async (req, res, next) => {
  const { username, password } = req.body
  const getUser = await getByUsername(username)
  const decoded = decodePassword(password, getUser.password)
  if (username === getUser.username && decoded) {
    const token = createToken({
      id: getUser.id,
      name: getUser.username
    })
    res.cookie('Authorization', `bearer ${token}`)
    res.status(200).redirect('/')
  }
  authPage.form_error = true
  authPage.form_style_text = 'text-danger fw-bold'
  authPage.form_error_message = 'user or passord incorrect!.'
  res.render('layout/form', authPage)
}

const saveUser = async (req, res, next) => {
  const { username, password } = req.body
  const encode = encodePassword(password)
  const user = await User.create({
    username: username,
    password: encode
  })
  if (!user) {
    next(err)
  }
  res.status(200).render('layout/form', authPage)
}

const renderSinginPage = (req, res) => {
  authPage.form_accion = '/register'
  authPage.form_title = 'Singup'
  authPage.form_link = '/login'
  authPage.form_link_text = 'have account? login!.'
  res.status(200).render('layout/form', authPage)
}

module.exports = {
  checkUsername,
  authenticate,
  renderLoginPage,
  saveUser,
  renderSinginPage
}

