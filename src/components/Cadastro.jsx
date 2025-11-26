import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import InputWithLabel from "./InputWithLabel"
import { X } from "react-feather"

const Cadastro = () => {
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    telefone: "",
    empresa: "",
    cargo: "",
  })
  const navigate = useNavigate()

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.senha !== formData.confirmarSenha) {
      alert("As senhas não coincidem!")
      return
    }
    navigate("/login")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6 border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => navigate("/login")}>
            <X size={24} className="text-brand-red" />
          </button>
          <h1 className="text-lg font-semibold text-brand-red flex-1 text-center -ml-5">
            Criar nova conta
          </h1>
        </div>

        {/* Logo */}
        <div className="text-center mb-6">
          <div className="flex justify-center items-center gap-3">
            <h1 className="text-2xl font-extrabold text-brand-red">ISG</h1>
            <img src="/logo.png" className="w-10" />
          </div>
          <p className="text-brand-red font-semibold mt-1 text-sm">
            Participações S.A.
          </p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputWithLabel
            label="Nome Completo"
            name="nomeCompleto"
            value={formData.nomeCompleto}
            onChange={handleChange}
            placeholder="Digite seu nome completo"
          />

          <InputWithLabel
            label="E-mail"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Digite seu e-mail"
          />

          <div className="flex flex-col md:flex-row gap-4">
            <InputWithLabel
              label="Senha"
              name="senha"
              type="password"
              value={formData.senha}
              onChange={handleChange}
              placeholder="Digite sua senha"
            />
            <InputWithLabel
              label="Confirmar Senha"
              name="confirmarSenha"
              type="password"
              value={formData.confirmarSenha}
              onChange={handleChange}
              placeholder="Confirme sua senha"
            />
          </div>

          <InputWithLabel
            label="Telefone"
            name="telefone"
            type="tel"
            value={formData.telefone}
            onChange={handleChange}
            placeholder="(00) 00000-0000"
          />

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm font-semibold text-brand-red">
                Empresa / Instituição
              </label>
              <select
                name="empresa"
                value={formData.empresa}
                onChange={handleChange}
                className="
                  mt-1 w-full px-3 py-2 border rounded-lg
                  border-gray-300 focus:border-brand-red focus:ring-brand-red
                "
              >
                <option value="">Selecione</option>
                <option>Empresa A</option>
                <option>Empresa B</option>
                <option>Empresa C</option>
              </select>
            </div>

            <InputWithLabel
              label="Cargo"
              name="cargo"
              value={formData.cargo}
              onChange={handleChange}
              placeholder="Digite seu cargo"
            />
          </div>

          {/* Botão */}
          <button
            type="submit"
            className="
              w-full bg-brand-red text-white py-3 rounded-full
              font-semibold text-lg hover:bg-red-800 transition shadow-sm
            "
          >
            Cadastrar
          </button>
        </form>

        <p className="text-center text-sm text-gray-700 mt-4">
          Já possui conta?{" "}
          <Link
            className="text-brand-red font-semibold hover:underline"
            to="/login"
          >
            Faça login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Cadastro
