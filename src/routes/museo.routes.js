const { Router } = require('express')
const router = Router()

//temp
const { Museo } = require('../models/museo.model')

router.get('/museos/create', (req, res) => {
  res.render('layout/create-museo', {
    title_header: 'museos',
    notify: false,
    text_style: 'text-danger',
    message: 'Fields must be complete'
  })
})

router.post('/museos/create', async (req, res, next) => {
  try {
    const {
      nombre,
      direccion,
      telefono,
      email,
      descripcion,
      horario
    } = req.body
    await Museo.create({
      nombre: nombre,
      direccion: direccion,
      telefono: telefono,
      email: email,
      descripcion: descripcion,
      horario: horario
    })
    const museos = await Museo.findAll()
    res.render('layout/museo', {
      title_header: 'museos',
      title: 'Museos',
      users: museos
    })
  } catch (err) {
    next(err)
  }
})

router.get('/museos/all', async (req, res, next) => {
  try {
    const museos = await Museo.findAll()
    res.render('layout/museo', {
      title_header: 'museos',
      title: 'Museos',
      users: museos
    })
  } catch (err) {
    next(err)
  }
})

router.get('/museos/update/:id', async (req, res, next) => {
  const id = req.params.id
  const museo = await Museo.findByPk(id)
  res.json(museo)
})

router.get('/museos/delete/:id', async (req, res, next) => {
  const id = req.params.id
  const museo = await Museo.findByPk(id)
  res.json(museo)
})

module.exports = router