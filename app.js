// Declarações de bibliotecas
const express = require('express') //npm install --save express
const handlebars = require('express-handlebars')//npm install --save express-handlebars
const bodyParser = require('body-parser')//npm install --save body-parser
const admim = require("./router/admim")
const usuarios = require("./router/usuarios")
const path = require("path")
const flash = require("connect-flash")//npm install --save connect-flash
const session = require("express-session")//npm install --save express-session
const app = express()
const mongoose = require('mongoose')
const passport = require("passport")
require("./config/auth")(passport)
const db = require("./config/db")

//Session
app.use(session({
    secret:"jackson123",
    resave:true,
    saveUninitialized:true
  }))

app.use(passport.initialize())
app.use(passport.session())

//MidleWare
app.use(flash())

  app.use((req,res,next)=>{
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash("error_msg")
    res.locals.error = req.flash("error")
    res.locals.user = req.user || null;
    next()
  })

//Body-Parser
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

//Haldlebars
app.engine('handlebars',handlebars({defaultLayout:'main'}))
app.set('view engine','handlebars')

//Mongoose
mongoose.Promise = global.Promise
mongoose.connect(db.mongoURI).then(()=>{
  console.log("Banco de Dados Conectado!")
}).catch((erro)=>{
  console.log("Erro ao conectar:"+erro)
})

//Public
app.use(express.static(path.join(__dirname,"public"))) //dirname pega o diretório absoluto

//Rotas
app.get('/',(req,res)=>{
    res.render("index")
  })

app.use('/admim',admim)
app.use('/usuarios',usuarios)

//Outros
const PORT = process.env.PORT || 8081
app.listen(PORT,()=>{
    console.log("SERVIDOR RODANDO")
})