import React, { useState, useEffect } from "react"
import { X } from "react-feather"
import Sidebar from "./Sidebar"
import InputWithLabel from "./InputWithLabel"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000"

const CadastroConvidados = () => {
  const [convidados, setConvidados] = useState([])
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
      const res = await fetch(`${API_URL}/api/convidados`)
      if (!res.ok) throw new Error("Erro")
      const data = await res.json()
      setConvidados(data)
    } catch (err) {
      console.error("Erro ao buscar convidados:", err)
      setConvidados([])
    } finally {
      setLoading(false)
    }
  }

  const filtered = convidados.filter((c) => {
    const q = search.toLowerCase()
    return (
      c.nome?.toLowerCase().includes(q) ||
      c.email?.toLowerCase().includes(q) ||
      (c.empresa || "").toLowerCase().includes(q)
    )
  })

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const openCreate = () => {
    setIsEditing(false)
    setEditingId(null)
    setFormData({
      nome: "",
      nascimento: "",
      cpf: "",
      email: "",
      empresa: "",
      cargo: "",
      setor: "",
      contratacao: "",
    })
    setShowForm(true)
  }

  const openEdit = (c) => {
    setIsEditing(true)
    setEditingId(c.id)
    setFormData({
      nome: c.nome || "",
      nascimento: c.nascimento || "",
      cpf: c.cpf || "",
      email: c.email || "",
      empresa: c.empresa || "",
      cargo: c.cargo || "",
      setor: c.setor || "",
      contratacao: c.contratacao || "",
    })
    setShowForm(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const method = isEditing ? "PUT" : "POST"
      const url = isEditing
        ? `${API_URL}/api/convidados/${editingId}`
        : `${API_URL}/api/convidados`

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
        setConvidados((prev) =>
          prev.map((p) => (p.id === editingId ? { ...p, ...saved } : p))
        )
      } else {
        setConvidados((prev) => [saved, ...prev])
      }

      setShowForm(false)
      setIsEditing(false)
      setEditingId(null)
      setFormData({
        nome: "",
        nascimento: "",
        cpf: "",
        email: "",
        empresa: "",
        cargo: "",
        setor: "",
        contratacao: "",
      })
    } catch (err) {
      console.error("Erro ao salvar:", err)
      alert("Erro ao salvar convidado")
    }
  }

  const handleDelete = async (id) => {
    if (!confirm("Deseja excluir esse convidado?")) return
    try {
      const res = await fetch(`${API_URL}/api/convidados/${id}`, {
        method: "DELETE",
      })
      if (!res.ok) throw new Error("Erro ao excluir")
      setConvidados((prev) => prev.filter((c) => c.id !== id))
    } catch (err) {
      console.error(err)
      alert("Erro ao excluir")
    }
  }

  const total = convidados.length

  return (
    <div className="h-screen flex">
      <Sidebar />
      <div className="flex-1 p-8 mt-16">
        {/* Header */}
        <div className="bg-white border-b-4 border-brand-red rounded-b-xl p-6 mb-6 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="Logo" className="w-12 h-auto" />
            <div>
              <h1 className="text-2xl font-bold text-brand-red">Convidados</h1>
              <p className="text-sm text-gray-600">
                Gerencie os convidados dos eventos
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
                <p className="text-sm text-gray-500">Convidados</p>
                <p className="text-xl font-bold">{total}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nome, e-mail ou empresa"
              className="px-4 py-2 border rounded-lg w-72"
            />
          </div>
        </div>

        {/* Tabela */}
        <div className="overflow-x-auto border border-brand-red/30 rounded-lg">
          <table className="min-w-full text-sm">
            <thead className="bg-brand-red text-white">
              <tr>
                <th className="text-left p-3">Nome</th>
                <th className="text-left p-3">E-mail</th>
                <th className="text-left p-3">Empresa</th>
                <th className="text-left p-3">Cargo</th>
                <th className="text-left p-3">Ações</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td className="p-3 text-center" colSpan="5">
                    Carregando...
                  </td>
                </tr>
              ) : filtered.length > 0 ? (
                filtered.map((c) => (
                  <tr key={c.id} className="border-b">
                    <td className="p-3">{c.nome}</td>
                    <td className="p-3">{c.email}</td>
                    <td className="p-3">{c.empresa || "-"}</td>
                    <td className="p-3">{c.cargo || "-"}</td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEdit(c)}
                          className="text-brand-red hover:underline text-sm"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(c.id)}
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
                  <td className="p-3 text-center" colSpan="5">
                    Nenhum convidado cadastrado
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
                  {isEditing ? "Editar Convidado" : "Cadastro de Convidados"}
                </h2>
                <p className="text-sm opacity-90 mt-1">
                  Complete os campos abaixo
                </p>
              </div>

              <div className="bg-white p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <InputWithLabel
                    label="Nome Completo"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    placeholder="Digite o nome"
                  />

                  <div className="flex flex-col md:flex-row gap-4">
                    <InputWithLabel
                      label="Data de Nascimento"
                      name="nascimento"
                      type="date"
                      value={formData.nascimento}
                      onChange={handleChange}
                    />
                    <InputWithLabel
                      label="CPF (opcional)"
                      name="cpf"
                      value={formData.cpf}
                      onChange={handleChange}
                      placeholder="000.000.000-00"
                    />
                  </div>

                  <InputWithLabel
                    label="E-mail"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Digite o e-mail"
                  />

                  <div className="flex flex-col md:flex-row gap-4">
                    <InputWithLabel
                      label="Empresa"
                      name="empresa"
                      value={formData.empresa}
                      onChange={handleChange}
                      placeholder="Empresa/Instituição"
                    />
                    <InputWithLabel
                      label="Cargo"
                      name="cargo"
                      value={formData.cargo}
                      onChange={handleChange}
                      placeholder="Cargo do convidado"
                    />
                  </div>

                  <div className="flex flex-col md:flex-row gap-4">
                    <InputWithLabel
                      label="Setor"
                      name="setor"
                      value={formData.setor}
                      onChange={handleChange}
                      placeholder="Setor de atuação"
                    />
                    <div className="flex-1 flex flex-col">
                      <label className="mb-1 text-sm font-semibold text-gray-700">
                        Tipo de Contratação
                      </label>
                      <select
                        name="contratacao"
                        value={formData.contratacao}
                        onChange={handleChange}
                        className="px-2 py-2 border rounded-lg w-full"
                      >
                        <option value="">Selecione</option>
                        <option value="CLT">CLT</option>
                        <option value="PJ">PJ</option>
                        <option value="Estágio">Estágio</option>
                      </select>
                    </div>
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

export default CadastroConvidados
