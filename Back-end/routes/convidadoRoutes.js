const express = require("express")
const router = express.Router()
const {
  getConvidados,
  createConvidado,
} = require("../controllers/convidadoController")
const verifyToken = require("../middleware/authMiddleware")

router.get("/", verifyToken, getConvidados)
router.post("/", verifyToken, createConvidado)

module.exports = router
