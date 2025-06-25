const { criarConvidado } = require("../models/convidadoModel");

const cadastrarConvidado = async (req, res) => {
  try {
    const { nome, nascimento, cpf, email, empresa, cargo, setor, contratacao } = req.body;

    if (!nome || !nascimento || !email || !empresa || !contratacao) {
      return res.status(400).json({ error: "Preencha os campos obrigatórios!" });
    }

    await criarConvidado({ nome, nascimento, cpf, email, empresa, cargo, setor, contratacao });

    res.status(201).json({ message: "Convidado cadastrado com sucesso!" });
  } catch (error) {
    console.error("Erro ao cadastrar convidado:", error);
    res.status(500).json({ error: "Erro no servidor ao cadastrar convidado." });
  }
};

module.exports = { cadastrarConvidado };
