const { Router } = require('express')
const router = Router()

// temp
const { Articulo } = require('../models/articulo.model')
const formidable = require('formidable')
const { pathUpload } = require('../../upload')
const { join } = require('path')
const {
  pathExistsSync,
  mkdirSync
} = require('fs-extra')
const { copyFile } = require('fs')

router.get('/articulos/create', (req, res, next) => {
  res.render('layout/create-articulo', {
    title_header: 'articulos',
  })
})

router.post('/articulos/create', async (req, res, next) => {
  try {
    const form = formidable({ keepExtensions: true })
    form
      .parse(req, (err, fields, files) => {
        if (err) next(err)
        const nameDir = join(pathUpload, fields.dir_name)
        if (!pathExistsSync(nameDir)) {
          mkdirSync(nameDir)
        }
        console.log(files.file.filepath);
        filePath = files.file.filepath
        copyFile(filePath, nameDir, err => {
          if (err) next(err)
        })
        // res.redirect('/')
      })
    // form.parse(req, (err, fields, files) => {
    //   if (err) {
    //     next(err)
    //     return
    //   }
    //   // create an function to do this
    //   console.log(fields)
    //   if (!fse.pathExistsSync(path.join(pathUpload, 'titulo'))) {
    //     fse.mkdirSync(path.join(pathUpload, 'titulo'))
    //   }
    //   fse.copy(files.file.filepath, pathUpload, (err) => {
    //     if (err) { next(err) }
    //     res.json(files)
    //   })
    // })
  } catch (err) {
    next(err)
  }
})

module.exports = router 