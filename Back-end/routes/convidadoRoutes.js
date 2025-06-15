const express = require("express");
const router = express.Router();
const { cadastrarConvidado } = require("../controllers/convidadoController");

router.post("/convidados", cadastrarConvidado);

module.exports = router;
