import { Router } from "express"
import {
  getAllFornecedores,
  createFornecedor,
  updateFornecedor,
  deleteFornecedor,
} from "../controllers/fornecedores.controller.js"

const router = Router()

router.get("/", getAllFornecedores)
router.post("/", createFornecedor)
router.put("/:id", updateFornecedor)
router.delete("/:id", deleteFornecedor)

export default router
