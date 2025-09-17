import { Router } from "express"
import {
  getAllColaboradores,
  createColaborador,
} from "../controllers/colaboradores.controller.js"

const router = Router()

router.get("/", getAllColaboradores)
router.post("/", createColaborador)

export default router
