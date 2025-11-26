import React, { useState, useEffect } from "react"
import { X } from "react-feather"
import Sidebar from "./Sidebar"
import InputWithLabel from "./InputWithLabel"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000"

const CadastroFornecedores = () => {
  const [fornecedores, setFornecedores] = useState([])
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
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetch(`${API_URL}/api/fornecedores`)
      .then((res) => res.json())
      .then((data) => setFornecedores(data))
      .catch((err) => console.error("Erro ao buscar fornecedores:", err))
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`${API_URL}/api/fornecedores`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        const novo = await res.json()
        setFornecedores([novo, ...fornecedores])
        setFormData({
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
        setShowForm(false)
      } else {
        alert("Erro ao cadastrar fornecedor")
      }
    } catch (err) {
      console.error("Erro:", err)
    }
  }

  return (
    <div className="h-screen flex">
      <Sidebar />
      <div className="flex-1 p-8 mt-20">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-brand-red">
            Fornecedores
          </h1>
          <button
            className="bg-brand-red text-white px-4 py-2 rounded-lg"
            onClick={() => setShowForm(true)}
          >
            Cadastrar
          </button>
        </div>

        {/* Tabela */}
        <div className="overflow-x-auto border border-brand-red/30 rounded-lg">
          <table className="min-w-full text-sm">
            <thead className="bg-brand-red text-white">
              <tr>
                <th className="p-3 text-left">Empresa</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Telefone</th>
                <th className="p-3 text-left">Responsável</th>
                <th className="p-3 text-left">Serviço</th>
              </tr>
            </thead>
            <tbody>
              {fornecedores.length > 0 ? (
                fornecedores.map((f) => (
                  <tr key={f.id} className="border-b">
                    <td className="p-3">{f.nomeEmpresa}</td>
                    <td className="p-3">{f.emailEmpresa}</td>
                    <td className="p-3">{f.telefoneEmpresa}</td>
                    <td className="p-3">{f.nomeResponsavel}</td>
                    <td className="p-3">{f.tipoServico}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-3 text-center">
                    Nenhum fornecedor cadastrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
            <div className="bg-white p-6 rounded-2xl w-full max-w-3xl relative">
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-3 right-3 text-brand-red"
              >
                <X size={24} />
              </button>

              <h2 className="text-xl font-semibold text-brand-red mb-6 text-center">
                Cadastro de Fornecedores
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Linha 1 */}
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <InputWithLabel
                      label="Nome da Empresa"
                      name="nomeEmpresa"
                      value={formData.nomeEmpresa}
                      onChange={handleChange}
                      placeholder="Digite o nome da empresa"
                    />
                  </div>
                  <div className="flex-1">
                    <InputWithLabel
                      label="Endereço"
                      name="endereco"
                      value={formData.endereco}
                      onChange={handleChange}
                      placeholder="Digite o endereço"
                    />
                  </div>
                </div>

                {/* Linha 2 */}
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <InputWithLabel
                      label="CNPJ (opcional)"
                      name="cnpj"
                      value={formData.cnpj}
                      onChange={handleChange}
                      placeholder="00.000.000/0000-00"
                    />
                  </div>
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
                </div>

                {/* Linha 3 */}
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <InputWithLabel
                      label="Telefone da Empresa"
                      name="telefoneEmpresa"
                      value={formData.telefoneEmpresa}
                      onChange={handleChange}
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                  <div className="flex-1">
                    <InputWithLabel
                      label="Nome do Responsável"
                      name="nomeResponsavel"
                      value={formData.nomeResponsavel}
                      onChange={handleChange}
                      placeholder="Digite o nome do responsável"
                    />
                  </div>
                </div>

                {/* Linha 4 */}
                <div className="flex flex-col md:flex-row gap-4">
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
                  <div className="flex-1">
                    <InputWithLabel
                      label="Telefone do Fornecedor"
                      name="telefoneFornecedor"
                      value={formData.telefoneFornecedor}
                      onChange={handleChange}
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                </div>

                {/* Linha 5 */}
                <div className="flex flex-col">
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

                {/* Botão */}
                <div className="flex justify-center mt-6">
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
        )}
      </div>
    </div>
  )
}

export default CadastroFornecedores
