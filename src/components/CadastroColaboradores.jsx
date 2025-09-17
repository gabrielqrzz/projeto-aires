import React, { useState, useEffect } from "react"
import { X } from "react-feather"
import Sidebar from "./Sidebar"
import InputWithLabel from "./InputWithLabel"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000"

const CadastroColaboradores = () => {
  const [colaboradores, setColaboradores] = useState([])
  const [formData, setFormData] = useState({
    nome: "",
    nascimento: "",
    cpf: "",
    email: "",
    empresa: "",
    cargo: "",
    setor: "",
    setorDepartamento: "",
  })
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadColaboradores()
  }, [])

  async function loadColaboradores() {
    try {
      setLoading(true)
      const res = await fetch(`${API_URL}/api/colaboradores`)
      if (!res.ok) throw new Error("Falha ao carregar")
      const data = await res.json()
      setColaboradores(data)
    } catch (err) {
      console.error("Erro ao buscar colaboradores:", err)
      setColaboradores([])
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`${API_URL}/api/colaboradores`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        const novo = await res.json()
        setColaboradores([novo, ...colaboradores])
        setFormData({
          nome: "",
          nascimento: "",
          cpf: "",
          email: "",
          empresa: "",
          cargo: "",
          setor: "",
          setorDepartamento: "",
        })
        setShowForm(false)
      } else {
        const errBody = await res.json().catch(() => ({}))
        console.error("Erro ao cadastrar:", errBody)
        alert(errBody.error || "Erro ao cadastrar colaborador")
      }
    } catch (err) {
      console.error("Erro:", err)
      alert("Erro ao cadastrar colaborador")
    }
  }

  return (
    <div className="h-screen flex">
      <Sidebar />
      <div className="flex-1 p-8 mt-20">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-brand-red">
            Colaboradores
          </h1>
          <button
            className="bg-brand-red text-white px-4 py-2 rounded-lg"
            onClick={() => setShowForm(true)}
          >
            Cadastrar
          </button>
        </div>

        <div className="overflow-x-auto border border-brand-red/30 rounded-lg">
          <table className="min-w-full text-sm">
            <thead className="bg-brand-red text-white">
              <tr>
                <th className="text-left p-3">Nome</th>
                <th className="text-left p-3">E-mail</th>
                <th className="text-left p-3">Empresa</th>
                <th className="text-left p-3">Setor / Departamento</th>
                <th className="text-left p-3">Cargo</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td className="p-3 text-center" colSpan="5">
                    Carregando...
                  </td>
                </tr>
              ) : colaboradores.length > 0 ? (
                colaboradores.map((c) => (
                  <tr key={c.id} className="border-b">
                    <td className="p-3">{c.nome}</td>
                    <td className="p-3">{c.email}</td>
                    <td className="p-3">{c.empresa || "-"}</td>
                    <td className="p-3">
                      {c.setorDepartamento || c.setor || "-"}
                    </td>
                    <td className="p-3">{c.cargo || "-"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="p-3 text-center" colSpan="5">
                    Nenhum colaborador cadastrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
            <div className="bg-white p-6 rounded-2xl w-full max-w-2xl relative">
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-3 right-3 text-brand-red"
              >
                <X size={24} />
              </button>

              <h2 className="text-xl font-semibold text-brand-red mb-6 text-center">
                Cadastro de Colaboradores
              </h2>

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
                      </select>
                    </div>
                  </div>

                  <InputWithLabel
                    label="Cargo"
                    name="cargo"
                    value={formData.cargo}
                    onChange={handleChange}
                    placeholder="Digite seu cargo"
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <InputWithLabel
                      label="Setor"
                      name="setor"
                      value={formData.setor}
                      onChange={handleChange}
                      placeholder="Setor"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col mb-4">
                      <label className="mb-1 text-sm font-semibold text-brand-red">
                        Setor/Departamento
                      </label>
                      <select
                        name="setorDepartamento"
                        value={formData.setorDepartamento}
                        onChange={handleChange}
                        className="px-2 py-2 border border-brand-red rounded-lg"
                      >
                        <option value="">Selecione</option>
                        <option value="Setor1">Setor 1</option>
                        <option value="Setor2">Setor 2</option>
                        <option value="Departamento1">Departamento 1</option>
                      </select>
                    </div>
                  </div>
                </div>

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

export default CadastroColaboradores
