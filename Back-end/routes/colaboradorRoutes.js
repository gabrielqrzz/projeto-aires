const express = require("express")
const router = express.Router()
const { cadastrarColaborador } = require("../controllers/colaboradorController")

router.post("/cadastroColaboradores", cadastrarColaborador)

module.exports = router
