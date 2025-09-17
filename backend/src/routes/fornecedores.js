import { Router } from "express"
import {
  getAllFornecedores,
  createFornecedor,
} from "../controllers/fornecedores.controller.js"

const router = Router()

router.get("/", getAllFornecedores)
router.post("/", createFornecedor)

// Aqui é ESSENCIAL o default
export default router
