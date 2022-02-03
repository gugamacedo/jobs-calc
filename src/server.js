const { urlencoded } = require('express')
const express = require('express')
const server = express()
const routes = require('./routes')

// habilita ejs
server.set('view engine', 'ejs')

// habilitar arquivos statics
server.use(express.static('public'))

// habilita req.body
server.use(express.urlencoded({ extended: true }))

// habilita rotas
server.use(routes)

server.listen(3000, () => console.log('Server is listening...'))