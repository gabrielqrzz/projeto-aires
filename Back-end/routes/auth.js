const express = require('express');
const router = express.Router();
const users = require('../users.json');


router.post('/login', (req, res) => {
  const { email, texto } = req.body;

  const user = users.find(u => u.email === email && u.texto === texto);

  if (user) {
    res.json({ success: true, message: 'Login bem-sucedido', user });
  } else {
    res.status(401).json({ success: false, message: 'Credenciais inválidas' });
  }
});

module.exports = router;
