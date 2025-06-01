const fakeUser = {
  email: "teste@exemplo.com",
  password: "123456",
}

export const login = (req, res) => {
  const { email, texto } = req.body

  if (!email || !texto) {
    return res.status(400).json({ mensagem: "Email e senha são obrigatórios." })
  }

  if (email === fakeUser.email && texto === fakeUser.password) {
    return res.status(200).json({ mensagem: "Login bem-sucedido!" })
  } else {
    return res.status(401).json({ mensagem: "Credenciais inválidas." })
  }
}
