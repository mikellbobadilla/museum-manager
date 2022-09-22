const express = require('express')
const logger = require('morgan')

const app = express()

// Middlewares
app.use(logger('dev'))
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

// Routes
app.use(require('./routes/index.routes'))
app.use(require('./routes/auth.routes'))

// Handle if the route not exists
app.use((req, res, next) => {
  res.status(404).send('Page Not Found!!')
})

app.use((err, req, res, next) => {
  console.log(err.stack)
  res.status(500).send('Error internal server')
})

module.exports = app