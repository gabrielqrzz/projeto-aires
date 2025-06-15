const pool = require("./db");

const criarConvidado = async (convidado) => {
  const sql = `
    INSERT INTO convidados (nome, nascimento, cpf, email, empresa, cargo, setor, contratacao)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    convidado.nome,
    convidado.nascimento,
    convidado.cpf,
    convidado.email,
    convidado.empresa,
    convidado.cargo,
    convidado.setor,
    convidado.contratacao,
  ];

  const [result] = await pool.execute(sql, values);
  return result;
};

module.exports = { criarConvidado };
