const db = require("./db")

const getAllConvidados = (callback) => {
  db.query("SELECT * FROM convidados", callback)
}

const createConvidado = (convidado, callback) => {
  const sql =
    "INSERT INTO convidados (nome, data_nascimento, cpf, email, empresa, cargo, setor, tipo_contratacao) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
  const values = [
    convidado.nome,
    convidado.data_nascimento,
    convidado.cpf,
    convidado.email,
    convidado.empresa,
    convidado.cargo,
    convidado.setor,
    convidado.tipo_contratacao,
  ]
  db.query(sql, values, callback)
}

module.exports = { getAllConvidados, createConvidado }
