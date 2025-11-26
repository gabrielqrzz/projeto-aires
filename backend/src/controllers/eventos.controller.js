import fs from "fs"
import path from "path"
import pool from "../db.js"

const uploadDir = path.resolve("uploads")

// Garante que a pasta exista
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

// 📌 LISTAR TODOS OS EVENTOS
export const getEventos = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM eventos ORDER BY ano DESC")
    res.json(rows)
  } catch (err) {
    console.error("Erro ao listar eventos:", err)
    res.status(500).json({ error: "Erro ao listar eventos" })
  }
}

// 📌 LISTAR EVENTOS POR ANO
export const getEventosPorAno = async (req, res) => {
  try {
    const { ano } = req.params
    const [rows] = await pool.query("SELECT * FROM eventos WHERE ano = ?", [
      ano,
    ])
    res.json(rows)
  } catch (err) {
    console.error("Erro ao listar eventos por ano:", err)
    res.status(500).json({ error: "Erro ao listar eventos por ano" })
  }
}

// 📌 CRIAR NOVO EVENTO
export const createEvento = async (req, res) => {
  try {
    const { nome, ano, descricao } = req.body
    const [result] = await pool.query(
      "INSERT INTO eventos (nome, ano, descricao) VALUES (?, ?, ?)",
      [nome, ano, descricao]
    )
    res.status(201).json({ id: result.insertId, nome, ano, descricao })
  } catch (err) {
    console.error("Erro ao criar evento:", err)
    res.status(500).json({ error: "Erro ao criar evento" })
  }
}

// 📌 UPLOAD DE ARQUIVOS
export const uploadArquivo = async (req, res) => {
  try {
    const { id } = req.params
    const file = req.file

    if (!file) {
      console.error("Nenhum arquivo foi enviado.")
      return res.status(400).json({ error: "Nenhum arquivo enviado" })
    }

    const caminho = `/uploads/${file.filename}`

    await pool.query(
      "INSERT INTO arquivos (evento_id, nome_arquivo, caminho) VALUES (?, ?, ?)",
      [id, file.originalname, caminho]
    )

    res.status(201).json({ message: "Arquivo anexado com sucesso", caminho })
  } catch (err) {
    console.error("Erro ao fazer upload:", err)
    res.status(500).json({ error: "Erro ao enviar arquivo" })
  }
}

// 📌 LISTAR ARQUIVOS DE UM EVENTO
export const getArquivosEvento = async (req, res) => {
  try {
    const { id } = req.params
    const [rows] = await pool.query(
      "SELECT * FROM arquivos WHERE evento_id = ?",
      [id]
    )
    res.json(rows)
  } catch (err) {
    console.error("Erro ao listar arquivos:", err)
    res.status(500).json({ error: "Erro ao listar arquivos" })
  }
}

// 📌 ABRIR / BAIXAR ARQUIVO
export const downloadArquivo = async (req, res) => {
  try {
    const { nome } = req.params
    const filePath = path.join(uploadDir, nome)

    if (!fs.existsSync(filePath)) {
      console.error("Arquivo não encontrado:", filePath)
      return res.status(404).json({ error: "Arquivo não encontrado" })
    }

    res.sendFile(filePath)
  } catch (err) {
    console.error("Erro ao abrir arquivo:", err)
    res.status(500).json({ error: "Erro ao abrir arquivo" })
  }
}

export const deleteEvento = async (req, res) => {
  try {
    const { id } = req.params
    await pool.query("DELETE FROM eventos WHERE id = ?", [id])
    res.json({ message: "Evento excluído com sucesso" })
  } catch {
    res.status(500).json({ error: "Erro ao excluir evento" })
  }
}

// 📌 EXCLUIR ARQUIVO
export const deleteArquivo = async (req, res) => {
  try {
    const { id } = req.params
    const [rows] = await pool.query("SELECT * FROM arquivos WHERE id = ?", [id])

    if (rows.length === 0) {
      console.error("Arquivo não encontrado no banco de dados.")
      return res.status(404).json({ error: "Arquivo não encontrado" })
    }

    const filePath = path.join(uploadDir, path.basename(rows[0].caminho))
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath)

    await pool.query("DELETE FROM arquivos WHERE id = ?", [id])
    res.json({ message: "Arquivo excluído com sucesso" })
  } catch (err) {
    console.error("Erro ao excluir arquivo:", err)
    res.status(500).json({ error: "Erro ao excluir arquivo" })
  }
}
