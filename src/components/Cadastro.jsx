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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validação básica
    if (formData.senha !== formData.confirmarSenha) {
      alert("As senhas não coincidem!")
      return
    }

    console.log("Dados de cadastro:", formData)

    // Aqui você implementaria a lógica de cadastro
    // Por enquanto, vamos apenas redirecionar para o login
    navigate("/login")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8">
      <div className="max-w-2xl w-full space-y-8 p-8">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigate("/login")}>
            <X className="text-brand-red" size={28} />
          </button>
          <h1 className="text-xl font-semibold text-brand-red text-center flex-1 -ml-7">
            Criar Nova Conta
          </h1>
        </div>

        {/* Logo */}
        <div className="text-center">
          <div className="flex justify-center items-center mb-4">
            <h1 className="text-2xl font-bold text-brand-red">ISG</h1>
            <img src="/logo.png" alt="Logo" className="w-10 h-auto ml-4" />
          </div>
          <p className="text-brand-red font-semibold text-lg">
            Participações S.A.
          </p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
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
              <div className="flex-1">
                <InputWithLabel
                  label="Senha"
                  name="senha"
                  type="password"
                  value={formData.senha}
                  onChange={handleChange}
                  placeholder="Digite sua senha"
                />
              </div>
              <div className="flex-1">
                <InputWithLabel
                  label="Confirmar Senha"
                  name="confirmarSenha"
                  type="password"
                  value={formData.confirmarSenha}
                  onChange={handleChange}
                  placeholder="Confirme sua senha"
                />
              </div>
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
                <div className="flex flex-col mb-4">
                  <label className="mb-1 text-sm font-semibold text-brand-red">
                    Empresa/Instituição
                  </label>
                  <select
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleChange}
                    className="px-2 py-2 border border-brand-red rounded-lg"
                  >
                    <option value="">Selecione</option>
                    <option value="Empresa A">Empresa A</option>
                    <option value="Empresa B">Empresa B</option>
                    <option value="Empresa C">Empresa C</option>
                  </select>
                </div>
              </div>
              <div className="flex-1">
                <InputWithLabel
                  label="Cargo"
                  name="cargo"
                  value={formData.cargo}
                  onChange={handleChange}
                  placeholder="Digite seu cargo"
                />
              </div>
            </div>
          </div>

          {/* Botão de cadastro */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-brand-red text-white font-semibold px-12 py-3 rounded-full hover:bg-red-800 transition-colors"
            >
              Cadastrar
            </button>
          </div>

          {/* Link para login */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Já tem uma conta?{" "}
              <Link
                to="/login"
                className="text-brand-red font-semibold hover:underline"
              >
                Faça login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Cadastro
