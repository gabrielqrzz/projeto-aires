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
  const [search, setSearch] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    load()
  }, [])

  const load = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${API_URL}/api/fornecedores`)
      if (!res.ok) throw new Error("Erro")
      const data = await res.json()
      setFornecedores(data)
    } catch (err) {
      console.error("Erro ao buscar fornecedores:", err)
      setFornecedores([])
    } finally {
      setLoading(false)
    }
  }

  const filtered = fornecedores.filter((f) => {
    const q = search.toLowerCase()
    return (
      f.nomeEmpresa?.toLowerCase().includes(q) ||
      f.emailEmpresa?.toLowerCase().includes(q) ||
      (f.tipoServico || "").toLowerCase().includes(q)
    )
  })

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const openCreate = () => {
    setIsEditing(false)
    setEditingId(null)
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
    setShowForm(true)
  }

  const openEdit = (f) => {
    setIsEditing(true)
    setEditingId(f.id)
    setFormData({
      nomeEmpresa: f.nomeEmpresa || "",
      endereco: f.endereco || "",
      cnpj: f.cnpj || "",
      emailEmpresa: f.emailEmpresa || "",
      telefoneEmpresa: f.telefoneEmpresa || "",
      nomeResponsavel: f.nomeResponsavel || "",
      emailFornecedor: f.emailFornecedor || "",
      telefoneFornecedor: f.telefoneFornecedor || "",
      tipoServico: f.tipoServico || "",
    })
    setShowForm(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const method = isEditing ? "PUT" : "POST"
      const url = isEditing
        ? `${API_URL}/api/fornecedores/${editingId}`
        : `${API_URL}/api/fornecedores`

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || "Erro")
      }

      const saved = await res.json()
      if (isEditing) {
        setFornecedores((prev) =>
          prev.map((p) => (p.id === editingId ? { ...p, ...saved } : p))
        )
      } else {
        setFornecedores((prev) => [saved, ...prev])
      }

      setShowForm(false)
      setIsEditing(false)
      setEditingId(null)
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
    } catch (err) {
      console.error("Erro ao salvar fornecedor:", err)
      alert("Erro ao salvar fornecedor")
    }
  }

  const handleDelete = async (id) => {
    if (!confirm("Deseja excluir esse fornecedor?")) return
    try {
      const res = await fetch(`${API_URL}/api/fornecedores/${id}`, {
        method: "DELETE",
      })
      if (!res.ok) throw new Error("Erro ao excluir")
      setFornecedores((prev) => prev.filter((f) => f.id !== id))
    } catch (err) {
      console.error(err)
      alert("Erro ao excluir")
    }
  }

  const total = fornecedores.length

  return (
    <div className="h-screen flex">
      <Sidebar />
      <div className="flex-1 p-8 mt-16">
        {/* Header */}
        <div className="bg-white border-b-4 border-brand-red rounded-b-xl p-6 mb-6 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="Logo" className="w-12 h-auto" />
            <div>
              <h1 className="text-2xl font-bold text-brand-red">
                Fornecedores
              </h1>
              <p className="text-sm text-gray-600">
                Controle de contratos e serviços
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right mr-4">
              <div className="text-sm text-gray-500">Total</div>
              <div className="text-lg font-semibold">{total}</div>
            </div>

            <button
              onClick={openCreate}
              className="bg-brand-red text-white px-4 py-2 rounded-lg"
            >
              Cadastrar
            </button>
          </div>
        </div>

        {/* Resumo + Busca */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex gap-4">
            <div className="bg-white rounded-2xl border shadow p-4 flex items-center gap-4">
              <div className="w-1 h-12 bg-brand-red rounded" />
              <div>
                <p className="text-sm text-gray-500">Fornecedores</p>
                <p className="text-xl font-bold">{total}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por empresa, email ou serviço"
              className="px-4 py-2 border rounded-lg w-72"
            />
          </div>
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
                <th className="p-3 text-left">Ações</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="p-3 text-center">
                    Carregando...
                  </td>
                </tr>
              ) : filtered.length > 0 ? (
                filtered.map((f) => (
                  <tr key={f.id} className="border-b">
                    <td className="p-3">{f.nomeEmpresa}</td>
                    <td className="p-3">{f.emailEmpresa}</td>
                    <td className="p-3">{f.telefoneEmpresa}</td>
                    <td className="p-3">{f.nomeResponsavel}</td>
                    <td className="p-3">{f.tipoServico}</td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEdit(f)}
                          className="text-brand-red hover:underline text-sm"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(f.id)}
                          className="text-red-500 hover:underline text-sm"
                        >
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-3 text-center">
                    Nenhum fornecedor cadastrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal vermelho */}
        {showForm && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
            <div className="w-full max-w-3xl rounded-2xl overflow-hidden shadow-lg">
              <div className="bg-brand-red p-5 relative text-white">
                <button
                  onClick={() => setShowForm(false)}
                  className="absolute right-4 top-4 text-white"
                >
                  <X size={22} />
                </button>
                <h2 className="text-lg font-semibold">
                  {isEditing ? "Editar Fornecedor" : "Cadastro de Fornecedores"}
                </h2>
                <p className="text-sm opacity-90 mt-1">
                  Preencha os dados do fornecedor
                </p>
              </div>

              <div className="bg-white p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
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

                  <div className="flex flex-col md:flex-row gap-4">
                    <InputWithLabel
                      label="CNPJ (opcional)"
                      name="cnpj"
                      value={formData.cnpj}
                      onChange={handleChange}
                      placeholder="00.000.000/0000-00"
                    />
                    <InputWithLabel
                      label="E-mail da Empresa"
                      name="emailEmpresa"
                      type="email"
                      value={formData.emailEmpresa}
                      onChange={handleChange}
                      placeholder="empresa@email.com"
                    />
                  </div>

                  <div className="flex flex-col md:flex-row gap-4">
                    <InputWithLabel
                      label="Telefone da Empresa"
                      name="telefoneEmpresa"
                      value={formData.telefoneEmpresa}
                      onChange={handleChange}
                      placeholder="(00) 00000-0000"
                    />
                    <InputWithLabel
                      label="Nome do Responsável"
                      name="nomeResponsavel"
                      value={formData.nomeResponsavel}
                      onChange={handleChange}
                      placeholder="Digite o nome do responsável"
                    />
                  </div>

                  <div className="flex flex-col md:flex-row gap-4">
                    <InputWithLabel
                      label="E-mail do Fornecedor"
                      name="emailFornecedor"
                      type="email"
                      value={formData.emailFornecedor}
                      onChange={handleChange}
                      placeholder="fornecedor@email.com"
                    />
                    <InputWithLabel
                      label="Telefone do Fornecedor"
                      name="telefoneFornecedor"
                      value={formData.telefoneFornecedor}
                      onChange={handleChange}
                      placeholder="(00) 00000-0000"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="mb-1 text-sm font-semibold text-gray-700">
                      Tipo de Serviço
                    </label>
                    <select
                      name="tipoServico"
                      value={formData.tipoServico}
                      onChange={handleChange}
                      className="px-2 py-2 border rounded-lg w-full"
                    >
                      <option value="">Selecione</option>
                      <option value="Buffet">Buffet</option>
                      <option value="Salão">Salão</option>
                      <option value="Banda">Banda</option>
                    </select>
                  </div>

                  <div className="flex justify-center mt-4">
                    <button
                      type="submit"
                      className="bg-brand-red text-white font-semibold px-10 py-2 rounded-full"
                    >
                      {isEditing ? "Salvar" : "Cadastrar"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CadastroFornecedores
