import React, { useEffect, useState } from "react"
import { X, Trash2, Eye } from "react-feather"

const API_URL = "http://localhost:4000"

const EventoDetalhes = ({ evento, onVoltar }) => {
  const [detalhe, setDetalhe] = useState(evento)
  const [arquivos, setArquivos] = useState([])
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)

  // busca dados atualizados do evento (caso tenham sido mudados no backend)
  const fetchDetalhe = async () => {
    try {
      const res = await fetch(`${API_URL}/api/eventos`)
      if (!res.ok) return
      const todos = await res.json()
      const atual = todos.find((t) => Number(t.id) === Number(evento.id))
      if (atual) setDetalhe(atual)
    } catch (err) {
      console.error("Erro fetchDetalhe:", err)
    }
  }

  const carregarArquivos = async () => {
    try {
      const res = await fetch(`${API_URL}/api/eventos/${evento.id}/arquivos`)
      if (!res.ok) throw new Error("Erro ao buscar arquivos")
      const data = await res.json()
      setArquivos(data)
    } catch (err) {
      console.error("Erro carregarArquivos:", err)
      setArquivos([])
    }
  }

  useEffect(() => {
    fetchDetalhe()
    carregarArquivos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [evento.id])

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!file) return alert("Selecione um arquivo antes de enviar!")

    const formData = new FormData()
    formData.append("file", file)

    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/api/eventos/${evento.id}/upload`, {
        method: "POST",
        body: formData,
      })
      if (!res.ok) throw new Error("Erro no upload")
      setFile(null)
      await carregarArquivos()
      alert("Arquivo enviado com sucesso")
    } catch (err) {
      console.error("Erro upload:", err)
      alert("Erro ao enviar arquivo")
    } finally {
      setLoading(false)
    }
  }

  const abrirArquivo = (caminho) => {
    // caminho vem como "/uploads/filename"
    const url = `${API_URL}${caminho}`
    window.open(url, "_blank")
  }

  const excluirArquivo = async (id) => {
    if (!confirm("Deseja realmente excluir este arquivo?")) return
    try {
      const res = await fetch(`${API_URL}/api/eventos/arquivos/${id}`, {
        method: "DELETE",
      })
      if (!res.ok) throw new Error("Erro ao excluir arquivo")
      await carregarArquivos()
    } catch (err) {
      console.error("Erro excluir arquivo:", err)
      alert("Erro ao excluir")
    }
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button onClick={onVoltar} className="text-brand-red font-semibold">
            ← Voltar
          </button>
          <h2 className="text-2xl font-bold text-brand-red">{detalhe.nome}</h2>
        </div>
        <div className="text-sm text-gray-500">{detalhe.ano}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left: informações do evento */}
        <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg border border-brand-red/10">
          <h3 className="text-lg font-semibold text-brand-red mb-2">
            Informações
          </h3>
          <p className="text-sm text-gray-700 mb-4">
            {detalhe.descricao || "Nenhuma descrição disponível."}
          </p>

          <div className="flex gap-3 items-center">
            <form onSubmit={handleUpload} className="flex items-center gap-2">
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="border border-brand-red p-2 rounded-lg"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-brand-red text-white px-4 py-2 rounded-lg"
              >
                {loading ? "Enviando..." : "Anexar"}
              </button>
            </form>
            {file && <div className="text-sm text-gray-600"> {file.name} </div>}
          </div>
        </div>

        {/* Right: arquivos */}
        <div className="bg-white p-4 rounded-lg border border-brand-red/10">
          <h3 className="text-lg font-semibold text-brand-red mb-3">
            Arquivos
          </h3>

          {arquivos.length > 0 ? (
            <ul className="space-y-3">
              {arquivos.map((a) => (
                <li
                  key={a.id}
                  className="flex items-center justify-between border rounded p-2"
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => abrirArquivo(a.caminho)}
                      className="flex items-center gap-2 text-left hover:underline"
                    >
                      <Eye size={16} className="text-brand-red" />
                      <span className="text-sm">{a.nome_arquivo}</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => excluirArquivo(a.id)}
                      className="text-red-500 hover:underline"
                      title="Excluir arquivo"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">Nenhum arquivo anexado.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default EventoDetalhes
