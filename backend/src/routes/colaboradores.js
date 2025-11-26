import { Router } from "express"
import {
  getAllColaboradores,
  createColaborador,
  updateColaborador,
  deleteColaborador,
} from "../controllers/colaboradores.controller.js"

const router = Router()

router.get("/", getAllColaboradores)
router.post("/", createColaborador)
router.put("/:id", updateColaborador)
router.delete("/:id", deleteColaborador)

export default router
