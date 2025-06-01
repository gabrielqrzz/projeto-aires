import db from "../config/db.js"

export const criarConvidado = async (req, res) => {
  const {
    nome,
    data_nascimento,
    cpf,
    email,
    empresa,
    cargo,
    setor,
    tipo_contratacao,
  } = req.body

  try {
    const sql = `
      INSERT INTO convidados 
      (nome, data_nascimento, cpf, email, empresa, cargo, setor, tipo_contratacao)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`

    await db.execute(sql, [
      nome,
      data_nascimento,
      cpf,
      email,
      empresa,
      cargo,
      setor,
      tipo_contratacao,
    ])

    res.status(201).json({ message: "Convidado cadastrado com sucesso!" })
  } catch (error) {
    console.error("Erro ao cadastrar convidado:", error)
    res.status(500).json({ error: "Erro no servidor" })
  }
}

export const listarConvidados = async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM convidados")
    res.json(rows)
  } catch (error) {
    console.error("Erro ao buscar convidados:", error)
    res.status(500).json({ error: "Erro no servidor" })
  }
}
