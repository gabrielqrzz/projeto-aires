const express = require("express");
const router = express.Router();
const { cadastrarFornecedor } = require("../controllers/fornecedorController");

router.post("/fornecedores", cadastrarFornecedor);

module.exports = router;
