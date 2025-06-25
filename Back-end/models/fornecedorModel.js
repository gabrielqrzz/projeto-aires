const pool = require("./db");

const criarFornecedor = async (fornecedor) => {
  const sql = `
    INSERT INTO fornecedores 
    (nomeEmpresa, endereco, cnpj, emailEmpresa, telefoneEmpresa, nomeResponsavel, emailFornecedor, telefoneFornecedor, tipoServico)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    fornecedor.nomeEmpresa,
    fornecedor.endereco,
    fornecedor.cnpj,
    fornecedor.emailEmpresa,
    fornecedor.telefoneEmpresa,
    fornecedor.nomeResponsavel,
    fornecedor.emailFornecedor,
    fornecedor.telefoneFornecedor,
    fornecedor.tipoServico,
  ];

  const [result] = await pool.execute(sql, values);
  return result;
};

module.exports = { criarFornecedor };
