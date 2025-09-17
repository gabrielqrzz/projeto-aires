import { Router } from "express"
import {
  getAllConvidados,
  createConvidado,
} from "../controllers/convidados.controller.js"

const router = Router()

router.get("/", getAllConvidados)
router.post("/", createConvidado)

export default router
