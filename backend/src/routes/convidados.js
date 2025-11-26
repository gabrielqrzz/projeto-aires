import { Router } from "express"
import {
  getAllConvidados,
  createConvidado,
  updateConvidado,
  deleteConvidado,
} from "../controllers/convidados.controller.js"

const router = Router()

router.get("/", getAllConvidados)
router.post("/", createConvidado)
router.put("/:id", updateConvidado)
router.delete("/:id", deleteConvidado)

export default router
