const express = require("express")
const router = express.Router()
const { cadastrarConvidado } = require("../controllers/convidadoController")

router.post("/cadastroConvidados", cadastrarConvidado)

module.exports = router
