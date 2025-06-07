const Guest = require("../models/convidadoModel")

const getGuests = (req, res) => {
  Guest.getAllGuests((err, results) => {
    if (err) return res.status(500).json({ erro: "Erro ao buscar convidados" })
    res.json(results)
  })
}

const createGuest = (req, res) => {
  const guest = req.body

  Guest.createGuest(guest, (err, result) => {
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

module.exports = { getGuests, createGuest }
