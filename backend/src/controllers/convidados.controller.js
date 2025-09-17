import { pool } from "../db.js"

export const getAllConvidados = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM convidados ORDER BY id DESC")
  res.json(rows)
}

export const createConvidado = async (req, res) => {
  const { nome, nascimento, cpf, email, empresa, cargo, setor, contratacao } =
    req.body
  const [result] = await pool.query(
    `INSERT INTO convidados (nome, nascimento, cpf, email, empresa, cargo, setor, contratacao)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [nome, nascimento, cpf, email, empresa, cargo, setor, contratacao]
  )
  res.status(201).json({ id: result.insertId, ...req.body })
}
