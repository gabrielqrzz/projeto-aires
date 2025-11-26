import pool from "../db.js"

// LISTAR
export const getAllConvidados = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM convidados ORDER BY id DESC")
    res.json(rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Erro ao listar convidados" })
  }
}

// CRIAR
export const createConvidado = async (req, res) => {
  try {
    const { nome, nascimento, cpf, email, empresa, cargo, setor, contratacao } =
      req.body

    const [result] = await pool.query(
      `INSERT INTO convidados (nome, nascimento, cpf, email, empresa, cargo, setor, contratacao)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [nome, nascimento, cpf, email, empresa, cargo, setor, contratacao]
    )

    res.status(201).json({ id: result.insertId, ...req.body })
  } catch (err) {
    console.error(err)

    res.status(500).json({ error: "Erro ao criar convidado" })
  }
}

// EDITAR
export const updateConvidado = async (req, res) => {
  try {
    const { id } = req.params
    const data = req.body

    await pool.query("UPDATE convidados SET ? WHERE id = ?", [data, id])

    const [rows] = await pool.query("SELECT * FROM convidados WHERE id = ?", [
      id,
    ])

    res.json(rows[0])
  } catch (err) {
    console.error(err)

    res.status(500).json({ error: "Erro ao atualizar convidado" })
  }
}

// EXCLUIR
export const deleteConvidado = async (req, res) => {
  try {
    const { id } = req.params
    await pool.query("DELETE FROM convidados WHERE id = ?", [id])
    res.json({ message: "Convidado removido" })
  } catch (err) {
    console.error(err)

    res.status(500).json({ error: "Erro ao excluir convidado" })
  }
}
