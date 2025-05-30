const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
  nome: String,
  cpf: String,
  email: String,
  empresa: String,
  cargo: String,
  setor: String,
});

module.exports = mongoose.model('Guest', guestSchema);
