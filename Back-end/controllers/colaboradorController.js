const { inserirColaborador } = require("../models/colaboradorModel");

const cadastrarColaborador = async (req, res) => {
  try {
    const colaborador = req.body;

    if (!colaborador.nome || !colaborador.nascimento || !colaborador.email || !colaborador.empresa || !colaborador.setorDepartamento) {
      return res.status(400).json({ mensagem: "Preencha todos os campos obrigatórios." });
    }

    await inserirColaborador(colaborador);

    res.status(201).json({ mensagem: "Colaborador cadastrado com sucesso!" });
  } catch (error) {
    console.error("Erro ao cadastrar colaborador:", error);
    res.status(500).json({ mensagem: "Erro interno no servidor." });
  }
};

module.exports = { cadastrarColaborador };
