const express = require("express")
const router = express.Router()
const pool = require("../models/db")

router.post("/guests", async (req, res) => {
  const { nome, nascimento, cpf, email, empresa, cargo, setor, contratacao } =
    req.body

  if (!nome || !nascimento || !email || !empresa || !contratacao) {
    return res
      .status(400)
      .json({ error: "Campos obrigatórios estão faltando." })
  }

  try {
    const sql = `
      INSERT INTO convidados 
      (nome, data_nascimento, cpf, email, empresa, cargo, setor, contratacao)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `
    const [result] = await pool.query(sql, [
      nome,
      nascimento,
      cpf,
      email,
      empresa,
      cargo || null,
      setor || null,
      contratacao,
    ])

    res.status(201).json({
      message: "Convidado cadastrado com sucesso!",
      id: result.insertId,
    })
  } catch (error) {
    console.error("Erro ao cadastrar convidado:", error)
    res.status(500).json({ error: "Erro interno ao cadastrar convidado." })
  }
})

module.exports = router
