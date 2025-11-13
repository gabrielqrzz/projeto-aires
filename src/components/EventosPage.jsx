import React, { useState, useEffect } from "react"
import Sidebar from "./Sidebar"
import EventoDetalhes from "./EventoDetalhes"

const API_URL = "http://localhost:4000"

const EventosPage = () => {
  const [eventos, setEventos] = useState([])
  const [anoSelecionado, setAnoSelecionado] = useState(null)
  const [eventoSelecionado, setEventoSelecionado] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    ano: "",
    data: "",
  })

  useEffect(() => {
    fetch(`${API_URL}/api/eventos`)
      .then((res) => res.json())
      .then((data) => setEventos(data))
      .catch((err) => console.error("Erro ao buscar eventos:", err))
  }, [])

  const anos = [...new Set(eventos.map((e) => e.ano))].sort((a, b) => b - a)
  const eventosDoAno = anoSelecionado
    ? eventos.filter((e) => e.ano === anoSelecionado)
    : eventos

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch(`${API_URL}/api/eventos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
    const novo = await res.json()
    setEventos([novo, ...eventos])
    setShowForm(false)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="h-screen flex">
      <Sidebar />
      <div className="flex-1 p-8 mt-20">
        {!eventoSelecionado ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-semibold text-brand-red">Eventos</h1>
              <button
                className="bg-brand-red text-white px-4 py-2 rounded-lg"
                onClick={() => setShowForm(true)}
              >
                Cadastrar Evento
              </button>
            </div>

            {/* Filtro por ano */}
            <div className="flex gap-2 mb-6">
              {anos.map((ano) => (
                <button
                  key={ano}
                  onClick={() => setAnoSelecionado(ano)}
                  className={`px-3 py-1 rounded-full border border-brand-red ${
                    anoSelecionado === ano
                      ? "bg-brand-red text-white"
                      : "text-brand-red"
                  }`}
                >
                  {ano}
                </button>
              ))}
            </div>

            {/* Lista de eventos */}
            <div className="grid md:grid-cols-2 gap-4">
              {eventosDoAno.map((ev) => (
                <div
                  key={ev.id}
                  onClick={() => setEventoSelecionado(ev)}
                  className="border border-brand-red p-4 rounded-xl cursor-pointer hover:bg-brand-red hover:text-white transition"
                >
                  <h2 className="font-semibold text-lg">{ev.nome}</h2>
                  <p className="text-sm">{ev.descricao}</p>
                  <p className="text-xs text-gray-500">{ev.data}</p>
                </div>
              ))}
            </div>

            {/* Modal de cadastro */}
            {showForm && (
              <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
                <div className="bg-white p-6 rounded-2xl w-full max-w-md relative">
                  <button
                    onClick={() => setShowForm(false)}
                    className="absolute top-3 right-3 text-brand-red"
                  >
                    ✕
                  </button>
                  <h2 className="text-xl font-semibold text-brand-red mb-4 text-center">
                    Cadastrar Evento
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                      name="nome"
                      placeholder="Nome do evento"
                      value={formData.nome}
                      onChange={handleChange}
                      className="w-full border border-brand-red px-2 py-1 rounded-lg"
                      required
                    />
                    <textarea
                      name="descricao"
                      placeholder="Descrição"
                      value={formData.descricao}
                      onChange={handleChange}
                      className="w-full border border-brand-red px-2 py-1 rounded-lg"
                    />
                    <input
                      name="ano"
                      type="number"
                      placeholder="Ano"
                      value={formData.ano}
                      onChange={handleChange}
                      className="w-full border border-brand-red px-2 py-1 rounded-lg"
                      required
                    />
                    <input
                      name="data"
                      type="date"
                      value={formData.data}
                      onChange={handleChange}
                      className="w-full border border-brand-red px-2 py-1 rounded-lg"
                    />
                    <button
                      type="submit"
                      className="bg-brand-red text-white w-full py-2 rounded-lg font-semibold"
                    >
                      Salvar
                    </button>
                  </form>
                </div>
              </div>
            )}
          </>
        ) : (
          <EventoDetalhes
            evento={eventoSelecionado}
            onVoltar={() => setEventoSelecionado(null)}
          />
        )}
      </div>
    </div>
  )
}

export default EventosPage
