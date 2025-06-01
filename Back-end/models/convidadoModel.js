const Convidado = require("./convidadoModel")

const getConvidados = (req, res) => {
  Convidado.getAllConvidados((err, results) => {
    if (err) return res.status(500).json({ erro: "Erro ao buscar convidados" })
    res.json(results)
  })
}

const createConvidado = (req, res) => {
  const convidado = req.body

  Convidado.createConvidado(convidado, (err, result) => {
    if (err)
      return res.status(500).json({ erro: "Erro ao cadastrar convidado" })
    res
      .status(201)
      .json({
        mensagem: "Convidado cadastrado com sucesso",
        id: result.insertId,
      })
  })
}

module.exports = { getConvidados, createConvidado }
