import React, { useState } from "react"
import InputWithLabel from "./InputWithLabel"
import { X } from "react-feather"
import Sidebar from "./Sidebar"

const CadastroFornecedores = () => {
  const [formData, setFormData] = useState({
    nomeEmpresa: "",
    endereco: "",
    cnpj: "",
    emailEmpresa: "",
    telefoneEmpresa: "",
    nomeResponsavel: "",
    emailFornecedor: "",
    telefoneFornecedor: "",
    tipoServico: "",
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Fornecedor cadastrado:", formData)
  }

  return (
    <div className="h-screen flex">
      <Sidebar />
      <div className="flex flex-col items-center justify-start bg-white p-6 mt-32 flex-1">
        {/* Topo */}
        <div className="flex items-center justify-between w-full max-w-3xl mb-4">
          <button>
            <X className="text-brand-red" size={28} />
          </button>
          <h1 className="text-xl font-semibold text-brand-red text-center flex-1 -ml-7">
            Cadastro de Fornecedores
          </h1>
        </div>

        {/* Formulário */}
        <formwb
          onSubmit={handleSubmit}
          className="w-full max-w-3xl bg-white rounded-lg"
        >
          {/* Linha 1 */}
          <InputWithLabel
            label="Nome da Empresa"
            name="nomeEmpresa"
            value={formData.nomeEmpresa}
            onChange={handleChange}
            placeholder="Digite o nome da empresa"
          />

          {/* Linha 2 */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <InputWithLabel
                label="Endereço"
                name="endereco"
                value={formData.endereco}
                onChange={handleChange}
                placeholder="Digite o endereço"
              />
            </div>
            <div className="flex-1">
              <InputWithLabel
                label="CNPJ (não obrigatório)"
                name="cnpj"
                value={formData.cnpj}
                onChange={handleChange}
                placeholder="00.000.000/0000-00"
              />
            </div>
          </div>

          {/* Linha 3 */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <InputWithLabel
                label="E-mail da Empresa"
                name="emailEmpresa"
                type="email"
                value={formData.emailEmpresa}
                onChange={handleChange}
                placeholder="empresa@email.com"
              />
            </div>
            <div className="flex-1">
              <InputWithLabel
                label="Telefone da Empresa"
                name="telefoneEmpresa"
                value={formData.telefoneEmpresa}
                onChange={handleChange}
                placeholder="(00) 00000-0000"
              />
            </div>
          </div>

          {/* Linha 4 */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <InputWithLabel
                label="Nome do Responsável"
                name="nomeResponsavel"
                value={formData.nomeResponsavel}
                onChange={handleChange}
                placeholder="Digite o nome do responsável"
              />
            </div>
            <div className="flex-1">
              <InputWithLabel
                label="E-mail do Fornecedor"
                name="emailFornecedor"
                type="email"
                value={formData.emailFornecedor}
                onChange={handleChange}
                placeholder="fornecedor@email.com"
              />
            </div>
          </div>

          {/* Linha 5 */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <InputWithLabel
                label="Telefone do Fornecedor"
                name="telefoneFornecedor"
                value={formData.telefoneFornecedor}
                onChange={handleChange}
                placeholder="(00) 00000-0000"
              />
            </div>
            <div className="flex-1 flex flex-col">
              <label className="mb-1 text-sm font-semibold text-brand-red">
                Tipo de Serviço
              </label>
              <select
                name="tipoServico"
                value={formData.tipoServico}
                onChange={handleChange}
                className="px-2 py-2 border border-brand-red rounded-lg"
              >
                <option value="">Selecione</option>
                <option value="Buffet">Buffet</option>
                <option value="Salão">Salão</option>
                <option value="Banda">Banda</option>
              </select>
            </div>
          </div>

          {/* Botão */}
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

export default CadastroFornecedores
