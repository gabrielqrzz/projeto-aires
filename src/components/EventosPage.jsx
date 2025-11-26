import React, { useEffect, useState } from "react"
import Sidebar from "./Sidebar"
import EventoDetalhes from "./EventoDetalhes"

const API_URL = "http://localhost:4000"

const EventosPage = () => {
  const [eventos, setEventos] = useState([])
  const [selectedYear, setSelectedYear] = useState(null)
  const [eventoSelecionado, setEventoSelecionado] = useState(null)

  const [showModal, setShowModal] = useState(false)
  const [novoEvento, setNovoEvento] = useState({
    nome: "",
    ano: "",
    descricao: "",
  })

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
    } catch {
      setEventos([])
    }
  }

  useEffect(() => {
    fetchEventos()
  }, [])

  const handleCreate = async (e) => {
    e.preventDefault()
    const res = await fetch(`${API_URL}/api/eventos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoEvento),
    })

    if (res.ok) {
      setShowModal(false)
      setNovoEvento({ nome: "", ano: "", descricao: "" })
      fetchEventos(selectedYear)
    }
  }

  const deleteEvento = async (id, e) => {
    e.stopPropagation()
    if (!confirm("Tem certeza que deseja excluir este evento?")) return

    const res = await fetch(`${API_URL}/api/eventos/${id}`, {
      method: "DELETE",
    })

    if (res.ok) {
      fetchEventos(selectedYear)
      if (eventoSelecionado?.id === id) setEventoSelecionado(null)
    }
  }

  const abrirDetalhe = (ev) => setEventoSelecionado(ev)

  return (
    <div className="h-screen flex">
      <Sidebar />

      <div className="flex-1 p-0 mt-16 overflow-y-auto">
        {eventoSelecionado ? (
          <EventoDetalhes
            evento={eventoSelecionado}
            onVoltar={() => setEventoSelecionado(null)}
          />
        ) : (
          <>
            {/* ---------------- H E A D E R ● V I S U A L ---------------- */}
            <header className="w-full bg-[#FFF] border-b-4 border-brand-red p-8 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-4">
                <img src="/logo.png" alt="Logo" className="w-14 h-auto" />
                <div>
                  <h1 className="text-3xl font-bold text-brand-red">Eventos</h1>
                  <p className="text-gray-600 font-medium">
                    Gerenciamento de eventos ISG Participações
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowModal(true)}
                className="bg-brand-red text-white px-5 py-3 rounded-lg shadow hover:bg-red-700 transition"
              >
                + Criar Evento
              </button>
            </header>

            {/* ---------------- B A R R A ● D E ● A N O S ---------------- */}
            <div className="p-6 flex gap-4 items-center flex-wrap border-b bg-gray-50">
              {[2022, 2023, 2024, 2025].map((ano) => (
                <button
                  key={ano}
                  onClick={() => fetchEventos(ano)}
                  className={`px-5 py-2 rounded-lg border transition font-medium ${
                    selectedYear === ano
                      ? "bg-brand-red text-white border-brand-red shadow"
                      : "bg-white text-brand-red border-brand-red hover:bg-red-50"
                  }`}
                >
                  {ano}
                </button>
              ))}

              <button
                onClick={() => fetchEventos(null)}
                className="px-5 py-2 rounded-lg bg-white border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
              >
                Ver Todos
              </button>
            </div>

            {/* ---------------- G R I D ● D E ● C A R D S ---------------- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
              {eventos.length > 0 ? (
                eventos.map((ev) => (
                  <article
                    key={ev.id}
                    onClick={() => abrirDetalhe(ev)}
                    className="relative bg-white rounded-2xl shadow-md hover:shadow-lg cursor-pointer border border-gray-200 overflow-hidden transition"
                  >
                    {/* Linha Vermelha no topo */}
                    <div className="w-full h-2 bg-brand-red"></div>

                    <div className="p-5">
                      <h3 className="text-xl font-bold text-brand-red">
                        {ev.nome}
                      </h3>

                      <p className="text-sm text-gray-700 mt-3 line-clamp-3">
                        {ev.descricao || "Sem descrição informada."}
                      </p>

                      <div className="flex justify-between items-center mt-4">
                        <span className="text-sm text-gray-500">{ev.ano}</span>

                        <button
                          onClick={(e) => deleteEvento(ev.id, e)}
                          className="text-red-500 hover:underline text-sm"
                        >
                          Excluir
                        </button>
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                <p className="text-gray-500 italic">
                  Nenhum evento encontrado.
                </p>
              )}
            </div>
          </>
        )}

        {/* ---------------- M O D A L ● D E ● C R I A Ç Ã O ---------------- */}
        {showModal && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
              <h2 className="text-xl font-semibold text-brand-red mb-4">
                Novo Evento
              </h2>

              <form onSubmit={handleCreate} className="flex flex-col gap-3">
                <input
                  required
                  type="text"
                  placeholder="Nome"
                  className="border p-2 rounded-lg"
                  value={novoEvento.nome}
                  onChange={(e) =>
                    setNovoEvento({ ...novoEvento, nome: e.target.value })
                  }
                />
                <input
                  required
                  type="number"
                  placeholder="Ano"
                  className="border p-2 rounded-lg"
                  value={novoEvento.ano}
                  onChange={(e) =>
                    setNovoEvento({ ...novoEvento, ano: e.target.value })
                  }
                />
                <textarea
                  placeholder="Descrição"
                  className="border p-2 rounded-lg"
                  value={novoEvento.descricao}
                  onChange={(e) =>
                    setNovoEvento({ ...novoEvento, descricao: e.target.value })
                  }
                />

                <div className="flex justify-between pt-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-gray-200 rounded-lg"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-brand-red text-white rounded-lg"
                  >
                    Criar
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

export default EventosPage
