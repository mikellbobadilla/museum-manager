const express = require('express')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const app = express()

// Middlewares
app.use(logger('dev'))
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Routes
app.use(require('./routes/index.routes'))
app.use(require('./routes/auth.routes'))
app.use(require('./routes/museo.routes'))
app.use(require('./routes/articulo.routes'))


// Handle if the route not exists
app.use((req, res, next) => {
  res.status(404).send('Page Not Found!!')
})

app.use((err, req, res, next) => {
  res.status(500).send(err.stack)
})

module.exports = app