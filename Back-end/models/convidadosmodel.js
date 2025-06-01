import { db } from "../database/db"

export const getAllConvidados = async () => {
  const [rows] = await db.query("SELECT * FROM convidados")
  return rows
}

export const addConvidado = async ({
  nome,
  cpf,
  email,
  empresa,
  cargo,
  setor,
}) => {
  const sql = `
    INSERT INTO convidados (nome, cpf, email, empresa, cargo, setor)
    VALUES (?, ?, ?, ?, ?, ?)
  `
  await db.execute(sql, [nome, cpf, email, empresa, cargo, setor])
}
