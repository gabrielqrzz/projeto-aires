const { criarFornecedor } = require("../models/fornecedorModel");

const cadastrarFornecedor = async (req, res) => {
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
    } = req.body;

    if (!nomeEmpresa || !endereco || !emailEmpresa || !telefoneEmpresa || !nomeResponsavel || !tipoServico) {
      return res.status(400).json({ error: "Preencha todos os campos obrigatórios." });
    }

    await criarFornecedor({
      nomeEmpresa,
      endereco,
      cnpj,
      emailEmpresa,
      telefoneEmpresa,
      nomeResponsavel,
      emailFornecedor,
      telefoneFornecedor,
      tipoServico,
    });

    res.status(201).json({ message: "Fornecedor cadastrado com sucesso!" });
  } catch (error) {
    console.error("Erro ao cadastrar fornecedor:", error);
    res.status(500).json({ error: "Erro no servidor ao cadastrar fornecedor." });
  }
};

module.exports = { cadastrarFornecedor };
