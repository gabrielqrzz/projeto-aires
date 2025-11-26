import pool from "../db.js"

// LISTAR
export const getAllColaboradores = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM colaboradores ORDER BY id DESC"
    )
    res.json(rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Erro ao listar colaboradores" })
  }
}

// CRIAR
export const createColaborador = async (req, res) => {
  try {
    const {
      nome,
      nascimento,
      cpf,
      email,
      empresa,
      cargo,
      setor,
      setorDepartamento,
    } = req.body

    const [result] = await pool.query(
      `INSERT INTO colaboradores
      (nome, nascimento, cpf, email, empresa, cargo, setor, setorDepartamento)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        nome,
        nascimento || null,
        cpf || null,
        email,
        empresa || null,
        cargo || null,
        setor || null,
        setorDepartamento || null,
      ]
    )

    const [rows] = await pool.query(
      "SELECT * FROM colaboradores WHERE id = ?",
      [result.insertId]
    )

    res.status(201).json(rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Erro ao criar colaborador" })
  }
}

// EDITAR
export const updateColaborador = async (req, res) => {
  try {
    const { id } = req.params
    const data = req.body

    await pool.query("UPDATE colaboradores SET ? WHERE id = ?", [data, id])

    const [rows] = await pool.query(
      "SELECT * FROM colaboradores WHERE id = ?",
      [id]
    )

    res.json(rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Erro ao atualizar colaborador" })
  }
}

// EXCLUIR
export const deleteColaborador = async (req, res) => {
  try {
    const { id } = req.params
    await pool.query("DELETE FROM colaboradores WHERE id = ?", [id])
    res.json({ message: "Colaborador removido" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Erro ao excluir colaborador" })
  }
}
