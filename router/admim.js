// Declarações de bibliotecas
const express = require('express')
const router = express.Router()

//Rotas
router.get('/',(req,res)=>{
    res.render("admim/index")
})

module.exports = router