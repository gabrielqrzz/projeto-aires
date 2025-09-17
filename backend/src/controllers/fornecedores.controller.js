import { pool } from "../db.js"

export const getAllFornecedores = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM fornecedores ORDER BY id DESC"
    )
    res.json(rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Erro ao listar fornecedores" })
  }
}

export const createFornecedor = async (req, res) => {
  try {
    const {
      nomeEmpresa,
      endereco,
      cnpj,
      emailEmpresa,
      telefoneEmpresa,
      nomeResponsavel,
      emailFornecedor,
      telefoneFornecedor,
      tipoServico,
    } = req.body

    const [result] = await pool.query(
      `INSERT INTO fornecedores 
      (nomeEmpresa, endereco, cnpj, emailEmpresa, telefoneEmpresa, nomeResponsavel, emailFornecedor, telefoneFornecedor, tipoServico)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        nomeEmpresa,
        endereco,
        cnpj || null,
        emailEmpresa,
        telefoneEmpresa,
        nomeResponsavel,
        emailFornecedor,
        telefoneFornecedor,
        tipoServico,
      ]
    )

    const [rows] = await pool.query("SELECT * FROM fornecedores WHERE id = ?", [
      result.insertId,
    ])
    res.status(201).json(rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Erro ao criar fornecedor" })
  }
}
