import { pool } from "../db.js"
import multer from "multer"
import path from "path"
import fs from "fs"

// Configuração do multer (upload de arquivos)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "src/uploads"
    if (!fs.existsSync(uploadPath))
      fs.mkdirSync(uploadPath, { recursive: true })
    cb(null, uploadPath)
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname)
  },
})

export const upload = multer({ storage })

// Listar todos os eventos
export const getAllEventos = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM eventos ORDER BY ano DESC, data DESC"
    )
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: "Erro ao listar eventos" })
  }
}

// Criar novo evento
export const createEvento = async (req, res) => {
  try {
    const { nome, descricao, ano, data } = req.body
    const [result] = await pool.query(
      "INSERT INTO eventos (nome, descricao, ano, data) VALUES (?, ?, ?, ?)",
      [nome, descricao, ano, data]
    )
    const [novo] = await pool.query("SELECT * FROM eventos WHERE id = ?", [
      result.insertId,
    ])
    res.status(201).json(novo[0])
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar evento" })
  }
}

// Upload de arquivo
export const uploadArquivo = async (req, res) => {
  try {
    const { id } = req.params
    const file = req.file

    await pool.query(
      "INSERT INTO arquivos_evento (evento_id, nome_arquivo, caminho_arquivo, tipo, tamanho) VALUES (?, ?, ?, ?, ?)",
      [id, file.originalname, file.path, file.mimetype, file.size]
    )

    res.status(200).json({ message: "Arquivo enviado com sucesso!" })
  } catch (err) {
    res.status(500).json({ error: "Erro ao fazer upload do arquivo" })
  }
}

// Listar arquivos de um evento
export const getArquivosEvento = async (req, res) => {
  try {
    const { id } = req.params
    const [rows] = await pool.query(
      "SELECT * FROM arquivos_evento WHERE evento_id = ?",
      [id]
    )
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: "Erro ao listar arquivos do evento" })
  }
}
