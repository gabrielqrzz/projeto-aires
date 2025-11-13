import { Router } from "express"
import {
  getAllEventos,
  createEvento,
  uploadArquivo,
  getArquivosEvento,
  upload,
} from "../controllers/eventos.controller.js"

const router = Router()

router.get("/", getAllEventos)
router.post("/", createEvento)
router.post("/:id/upload", upload.single("file"), uploadArquivo)
router.get("/:id/arquivos", getArquivosEvento)

export default router
