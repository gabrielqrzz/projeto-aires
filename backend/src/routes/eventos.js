import { Router } from "express"
import multer from "multer"
import {
  getEventos,
  getEventosPorAno,
  createEvento,
  uploadArquivo,
  getArquivosEvento,
  downloadArquivo,
  deleteArquivo,
} from "../controllers/eventos.controller.js"

const router = Router()

// Configuração do multer
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + file.originalname
    cb(null, uniqueSuffix)
  },
})
const upload = multer({ storage })

// Rotas
router.get("/eventos", getEventos)
router.get("/eventos/:ano", getEventosPorAno)
router.post("/eventos", createEvento)
router.post("/eventos/:id/upload", upload.single("file"), uploadArquivo)
router.get("/eventos/:id/arquivos", getArquivosEvento)
router.get("/uploads/:nome", downloadArquivo)
router.delete("/eventos/arquivos/:id", deleteArquivo)

export default router
