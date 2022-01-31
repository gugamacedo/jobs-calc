const express = require('express')
const server = express()
const routes = require('./routes')

// habilita ejs
server.set('view engine', 'ejs')

// habilitar arquivos statics
server.use(express.static('public'))

// rotas
server.use(routes)

server.listen(3000, () => console.log('Server is listening...'))