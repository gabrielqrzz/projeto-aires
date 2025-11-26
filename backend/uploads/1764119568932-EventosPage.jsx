import React, { useEffect, useState } from "react"
import Sidebar from "./Sidebar"
import EventoDetalhes from "./EventoDetalhes"

const API_URL = "http://localhost:4000"

const EventosPage = () => {
  const [eventos, setEventos] = useState([])
  const [selectedYear, setSelectedYear] = useState(null)
  const [eventoSelecionado, setEventoSelecionado] = useState(null)

  // modal de criação
  const [showModal, setShowModal] = useState(false)
  const [novoEvento, setNovoEvento] = useState({
    nome: "",
    ano: "",
    descricao: "",
  })

  // buscar eventos (todos ou por ano)
  const fetchEventos = async (ano = null) => {
    try {
      const url = ano
        ? `${API_URL}/api/eventos/${ano}`
        : `${API_URL}/api/eventos`
      const res = await fetch(url)
      if (!res.ok) throw new Error("Erro ao buscar eventos")
      const data = await res.json()
      setEventos(data)
      setSelectedYear(ano)
    } catch (err) {
      console.error("Erro fetchEventos:", err)
      setEventos([])
    }
  }

  useEffect(() => {
    fetchEventos()
  }, [])

  // criar evento
  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`${API_URL}/api/eventos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoEvento),
      })
      if (!res.ok) throw new Error("Erro ao criar")
      setShowModal(false)
      setNovoEvento({ nome: "", ano: "", descricao: "" })
      fetchEventos(selectedYear)
    } catch (err) {
      console.error("Erro criar evento:", err)
      alert("Erro ao criar evento")
    }
  }

  // excluir evento
  const deleteEvento = async (id, e) => {
    if (e) e.stopPropagation() // evitar abrir detalhe
    if (!confirm("Tem certeza que deseja excluir este evento?")) return

    try {
      const res = await fetch(`${API_URL}/api/eventos/${id}`, {
        method: "DELETE",
      })
      if (!res.ok) throw new Error("Erro ao excluir")
      fetchEventos(selectedYear)
      if (eventoSelecionado && eventoSelecionado.id === id)
        setEventoSelecionado(null)
    } catch (err) {
      console.error("Erro deleteEvento:", err)
      alert("Erro ao excluir evento")
    }
  }

  // abrir detalhe (quando clicar no card)
  const abrirDetalhe = (ev) => setEventoSelecionado(ev)

  // voltar do detalhe
  const handleVoltar = () => setEventoSelecionado(null)

  return (
    <div className="h-screen flex">
      <Sidebar />
      <div className="flex-1 p-8 mt-16">
        {/* Se um evento está selecionado, mostramos detalhes (lado a lado) */}
        {eventoSelecionado ? (
          <EventoDetalhes evento={eventoSelecionado} onVoltar={handleVoltar} />
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-semibold text-brand-red">Eventos</h1>

              <div className="flex items-center gap-3">
                {selectedYear && (
                  <button
                    onClick={() => fetchEventos(null)}
                    className="bg-brand-red text-white px-4 py-2 rounded-lg"
                  >
                    Ver Todos
                  </button>
                )}
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-brand-red text-white px-4 py-2 rounded-lg"
                >
                  + Adicionar Evento
                </button>
              </div>
            </div>

            {/* Filtros de ano */}
            <div className="flex gap-3 mb-6">
              {[2022, 2023, 2024, 2025].map((ano) => (
                <button
                  key={ano}
                  onClick={() => fetchEventos(ano)}
                  className={`px-4 py-2 rounded-lg ${
                    selectedYear === ano
                      ? "bg-brand-red text-white"
                      : "bg-gray-100 text-brand-red"
                  }`}
                >
                  {ano}
                </button>
              ))}
            </div>

            {/* Grid de cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {eventos.length > 0 ? (
                eventos.map((ev) => (
                  <article
                    key={ev.id}
                    onClick={() => abrirDetalhe(ev)}
                    className="relative bg-white border border-brand-red/30 rounded-2xl p-5 shadow-sm hover:shadow-md transition cursor-pointer"
                  >
                    <header className="flex items-start justify-between">
                      <h3 className="text-lg font-bold text-brand-red">
                        {ev.nome}
                      </h3>
                      <span className="text-sm text-gray-500">{ev.ano}</span>
                    </header>

                    <p className="text-sm text-gray-700 mt-3 line-clamp-3">
                      {ev.descricao || "Sem descrição."}
                    </p>

                    {/* Ações (botão excluir) - evita propagação para não abrir o detalhe */}
                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={(e) => deleteEvento(ev.id, e)}
                        className="text-red-500 hover:underline text-sm"
                        aria-label={`Excluir evento ${ev.nome}`}
                      >
                        Excluir
                      </button>
                    </div>
                  </article>
                ))
              ) : (
                <p className="text-gray-500 italic">
                  Nenhum evento encontrado.
                </p>
              )}
            </div>

            {/* Modal de criação */}
            {showModal && (
              <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
                  <h2 className="text-xl font-semibold text-brand-red mb-4">
                    Novo Evento
                  </h2>
                  <form onSubmit={handleCreate} className="flex flex-col gap-3">
                    <input
                      required
                      type="text"
                      placeholder="Nome do evento"
                      className="border p-2 rounded-lg"
                      value={novoEvento.nome}
                      onChange={(e) =>
                        setNovoEvento((s) => ({ ...s, nome: e.target.value }))
                      }
                    />
                    <input
                      required
                      type="number"
                      placeholder="Ano"
                      className="border p-2 rounded-lg"
                      value={novoEvento.ano}
                      onChange={(e) =>
                        setNovoEvento((s) => ({ ...s, ano: e.target.value }))
                      }
                    />
                    <textarea
                      placeholder="Descrição (opcional)"
                      className="border p-2 rounded-lg"
                      value={novoEvento.descricao}
                      onChange={(e) =>
                        setNovoEvento((s) => ({
                          ...s,
                          descricao: e.target.value,
                        }))
                      }
                    />

                    <div className="flex justify-between mt-2">
                      <button
                        type="button"
                        onClick={() => setShowModal(false)}
                        className="px-4 py-2 rounded-lg bg-gray-200"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-lg bg-brand-red text-white"
                      >
                        Criar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default EventosPage
