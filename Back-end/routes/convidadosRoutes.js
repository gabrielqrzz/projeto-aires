import express from "express"
import {
  listarConvidados,
  criarConvidado,
} from "../controllers/convidadosController.js"

const router = express.Router()

router.get("/", listarConvidados)
router.post("/", criarConvidado)

export default router
