import React, { useState, useEffect } from "react"
import { X } from "react-feather"
import Sidebar from "./Sidebar"
import InputWithLabel from "./InputWithLabel"

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

  // Buscar convidados ao carregar a página
  useEffect(() => {
    fetch("http://localhost:4000/api/convidados")
      .then((res) => res.json())
      .then((data) => setConvidados(data))
      .catch((err) => console.error("Erro ao buscar convidados:", err))
  }, [])

  // Atualizar campos do form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Enviar form para o backend
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch("http://localhost:4000/api/convidados", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        const novo = await res.json()
        setConvidados([novo, ...convidados]) // atualiza tabela
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
        setShowForm(false)
      } else {
        alert("Erro ao cadastrar convidado")
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
          <h1 className="text-2xl font-semibold text-brand-red">Convidados</h1>
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
                <th className="text-left p-3">Nome</th>
                <th className="text-left p-3">E-mail</th>
                <th className="text-left p-3">Empresa</th>
                <th className="text-left p-3">Cargo</th>
              </tr>
            </thead>
            <tbody>
              {convidados.length > 0 ? (
                convidados.map((c) => (
                  <tr key={c.id} className="border-b">
                    <td className="p-3">{c.nome}</td>
                    <td className="p-3">{c.email}</td>
                    <td className="p-3">{c.empresa || "-"}</td>
                    <td className="p-3">{c.cargo || "-"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="p-3 text-center" colSpan="4">
                    Nenhum convidado cadastrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal de Cadastro */}
        {showForm && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-2xl w-full max-w-2xl relative">
              {/* Botão Fechar */}
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-3 right-3 text-brand-red"
              >
                <X size={24} />
              </button>

              <h2 className="text-xl font-semibold text-brand-red mb-6 text-center">
                Cadastro de Convidados
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
                <InputWithLabel
                  label="Setor"
                  name="setor"
                  value={formData.setor}
                  onChange={handleChange}
                  placeholder="Setor de atuação"
                />
                <div className="flex flex-col">
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

export default CadastroConvidados
