const { urlencoded } = require('express')
const express = require('express')
const server = express()
const routes = require('./routes')
const path = require('path')

// habilita ejs
server.set('view engine', 'ejs')

// muda a localização da pasta views pro server
server.set('views', path.join(__dirname, 'views'))

// habilitar arquivos statics
server.use(express.static('public'))

// habilita req.body
server.use(express.urlencoded({ extended: true }))

// habilita rotas
server.use(routes)

server.listen(3000, () => console.log('Server is listening...'))