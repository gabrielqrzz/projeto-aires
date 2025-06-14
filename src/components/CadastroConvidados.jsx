import React, { useState } from "react"
import InputWithLabel from "./InputWithLabel"
import { X } from "react-feather"
import Sidebar from "./Sidebar"

const GuestRegistration = () => {
  const [formData, setFormData] = useState({
    nome: "",
    nascimento: "",
    cpf: "",
    email: "",
    empresa: "",
    cargo: "",
    setor: "",
    contratacao: "",
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Dados cadastrados:", formData)

    //FUNÇÃO QUE VAI SER USADA PARA ENVIAR OS DADOS PARA API OU LIMPAR OS FORMULARIOS
  }

  return (
    <div className="h-screen flex">
      <Sidebar />
      <div className=" flex flex-col items-center justify-start bg-white p-6 mt-32 flex-1">
        {/* Topo */}
        <div className="flex items-center justify-between w-full max-w-3xl mb-4">
          <button>
            <X className="text-brand-red" size={28} />
          </button>
          <h1 className="text-xl font-semibold text-brand-red text-center flex-1 -ml-7">
            Cadastro de Convidados
          </h1>
        </div>

        {/* Formulário */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-3xl bg-white rounded-lg"
        >
          <InputWithLabel
            label="Nome Completo"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            placeholder="Digite seu nome"
          />
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <InputWithLabel
                label="Data de Nascimento"
                name="nascimento"
                type="date"
                value={formData.nascimento}
                onChange={handleChange}
                placeholder="dd/mm/aaaa"
              />
            </div>
            <div className="flex-1">
              <InputWithLabel
                label="CPF (não obrigatório)"
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
                placeholder="000.000.000-00"
              />
            </div>
          </div>
          <InputWithLabel
            label="E-mail"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Digite seu e-mail"
          />
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
            </select>
          </div>

          <div className="flex flex-col mb-6">
            <label className="mb-1 text-sm font-semibold text-brand-red">
              Tipo de Contratação
            </label>
            <select
              name="contratacao"
              value={formData.contratacao}
              onChange={handleChange}
              className="px-2 py-2 border border-brand-red rounded-lg"
            >
              <option value="">Selecione</option>
              <option value="CLT">CLT</option>
              <option value="PJ">PJ</option>
              <option value="Estágio">Estágio</option>
            </select>
          </div>
          {/* Botão de cadastrar */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-brand-red text-white font-semibold px-10 py-2 rounded-full"
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default GuestRegistration
