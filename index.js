const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const connection = require('./database/database')
const usersModel = require('./database/users')
const { where } = require('sequelize')
connection
        .authenticate()
        .then(() =>{
            console.log("conexão feita com db")
        })
        .catch(() =>{
            console.log("erro ao conectar com o db")
        })

app.set('view engine','ejs')
app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/',(req, res) => {
    res.render('index')
})

app.post('/',(req, res) => {
    var nomeUser = req.body.nome
    var senhaUser = req.body.senha
    const buscaUser = usersModel.findOne({where: {nome:nomeUser, senha:senhaUser}})
    .then(usuario => {
        if (usuario) {
            res.render('logado')
        } else {
            res.redirect('/')
        }
    })
})
    

app.get('/cadastro',(req, res) =>{
    res.render('cadastro')
})

app.post('/savecad', (req, res) =>{
    var nome = req.body.nome
    var email = req.body.email
    var cidade = req.body.cidade
    var senha = req.body.senha

    usersModel.create({
        nome: nome,
        email: email,
        cidade: cidade,
        senha:senha

    }).then(()=>{   
        res.redirect('/')
    
    })
    .catch((msgErro) =>{
        console.log(msgErro)
    })
})

app.listen(3000,()=> {console.log("aplicativo rodando")
})