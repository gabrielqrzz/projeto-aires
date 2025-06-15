const pool = require("./db");

const inserirColaborador = async (colaborador) => {
  const query = `
    INSERT INTO colaboradores 
    (nome, nascimento, cpf, email, empresa, cargo, setor, setorDepartamento)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    colaborador.nome,
    colaborador.nascimento,
    colaborador.cpf || null,
    colaborador.email,
    colaborador.empresa,
    colaborador.cargo || null,
    colaborador.setor || null,
    colaborador.setorDepartamento,
  ];

  await pool.execute(query, values);
};

module.exports = { inserirColaborador };
