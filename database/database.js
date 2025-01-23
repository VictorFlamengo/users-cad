const sequelize = require('sequelize')
const connection = new sequelize('formcad','root','',{
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection