const sequelize = require('sequelize')
const connection = require('./database')

const Users = connection.define('users',{   
    nome:{
        type:sequelize.STRING,
        allowNull: false
    },
    email:{
        type:sequelize.STRING,
        allowNull: false
    },
    cidade:{
        type:sequelize.STRING,
        allowNull: false
    },
    senha:{
        type:sequelize.STRING,
        allowNull: false
    }
})

Users.sync({force:false}).then(() =>{})

module.exports = Users