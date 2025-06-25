import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import InputWithLabel from "./InputWithLabel"

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Dados de login:", formData)

    // IMPLEMENTAR A LOGICA PARA AUTENTICAR, POR ENQUANTO SÓ REDIRECIONA PARA A HOMEPAGE
    navigate("/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        {/* Logo e título da tela */}
        <div className="text-center">
          <div className="flex justify-center items-center mb-4">
            <h1 className="text-2xl font-bold text-brand-red">ISG</h1>
            <img src="/logo.png" alt="Logo" className="w-10 h-auto ml-4" />
          </div>
          <p className="text-brand-red font-semibold text-lg">
            Participações S.A.
          </p>
          <h2 className="mt-6 text-xl font-semibold text-brand-red">
            Faça login em sua conta
          </h2>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <InputWithLabel
              label="E-mail"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Digite seu e-mail"
            />

            <InputWithLabel
              label="Senha"
              name="senha"
              type="password"
              value={formData.senha}
              onChange={handleChange}
              placeholder="Digite sua senha"
            />
          </div>

          {/* Link esqueci minha senha */}
          <div className="flex items-center justify-end">
            <Link
              to="/esqueci-senha"
              className="text-sm text-brand-red hover:underline"
            >
              Esqueci minha senha
            </Link>
          </div>

          {/* Botão de Login */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-brand-red text-white font-semibold px-12 py-3 rounded-full hover:bg-red-800 transition-colors"
            >
              Entrar
            </button>
          </div>

          {/* Cadastro */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Não tem uma conta?{" "}
              <Link
                to="/cadastro"
                className="text-brand-red font-semibold hover:underline"
              >
                Cadastre-se
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
