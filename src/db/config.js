const sqlite3 = require('sqlite3')
const { open } = require('sqlite')

// pra usar o open ele precisa estar dentro de uma função. Sem why, só aceita
module.exports = () => open({
  filename: './database.sqlite',
  driver: sqlite3.Database
})