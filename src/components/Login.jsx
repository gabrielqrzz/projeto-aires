import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import InputWithLabel from "./InputWithLabel"

const Login = () => {
  const [formData, setFormData] = useState({ email: "", senha: "" })
  const navigate = useNavigate()

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate("/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      {/* Card */}
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-10 border border-gray-200">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-3">
            <h1 className="text-3xl font-extrabold text-brand-red tracking-wide">
              ISG
            </h1>
            <img src="/logo.png" className="w-12" />
          </div>
          <p className="text-brand-red font-semibold mt-1">
            Participações S.A.
          </p>
        </div>

        {/* Título */}
        <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
          Faça login na sua conta
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">E-mail</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Digite seu e-mail"
              className="
                w-full mt-1 px-4 py-2 border rounded-lg 
                border-gray-300 focus:border-brand-red focus:ring-brand-red
                outline-none transition
              "
            />
          </div>

          {/* Senha */}
          <div>
            <label className="text-sm font-medium text-gray-700">Senha</label>
            <input
              type="password"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              placeholder="Digite sua senha"
              className="
                w-full mt-1 px-4 py-2 border rounded-lg 
                border-gray-300 focus:border-brand-red focus:ring-brand-red
                outline-none transition
              "
            />
          </div>

          {/* Esqueci senha */}
          <div className="flex justify-end">
            <Link
              className="text-sm text-brand-red hover:underline"
              to="/esqueci-senha"
            >
              Esqueci minha senha
            </Link>
          </div>

          {/* Botão */}
          <button
            type="submit"
            className="
              w-full bg-brand-red text-white py-3 rounded-full
              font-semibold text-lg hover:bg-red-800 transition shadow-sm
            "
          >
            Entrar
          </button>
        </form>

        {/* Criar conta */}
        <p className="text-center text-sm text-gray-700 mt-6">
          Não tem conta?{" "}
          <Link
            className="text-brand-red font-semibold hover:underline"
            to="/cadastro"
          >
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
