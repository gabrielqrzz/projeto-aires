import React, { useEffect, useState } from "react"

const API_URL = "http://localhost:4000"

const EventoDetalhes = ({ evento, onVoltar }) => {
  const [arquivos, setArquivos] = useState([])
  const [file, setFile] = useState(null)

  useEffect(() => {
    fetch(`${API_URL}/api/eventos/${evento.id}/arquivos`)
      .then((res) => res.json())
      .then((data) => setArquivos(data))
  }, [evento.id])

  const handleUpload = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("file", file)

    await fetch(`${API_URL}/api/eventos/${evento.id}/upload`, {
      method: "POST",
      body: formData,
    })

    const res = await fetch(`${API_URL}/api/eventos/${evento.id}/arquivos`)
    const novosArquivos = await res.json()
    setArquivos(novosArquivos)
  }

  return (
    <div>
      <button onClick={onVoltar} className="text-brand-red mb-4 font-semibold">
        ← Voltar
      </button>
      <h2 className="text-2xl font-semibold text-brand-red mb-2">
        {evento.nome}
      </h2>
      <p className="mb-4">{evento.descricao}</p>

      <form onSubmit={handleUpload} className="flex items-center gap-3 mb-6">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="border border-brand-red p-1 rounded-lg"
        />
        <button
          type="submit"
          className="bg-brand-red text-white px-4 py-1 rounded-lg"
        >
          Enviar
        </button>
      </form>

      <div className="border border-brand-red rounded-lg p-4">
        <h3 className="font-semibold mb-3 text-brand-red">Arquivos Anexados</h3>
        {arquivos.length > 0 ? (
          <ul>
            {arquivos.map((arq) => (
              <li
                key={arq.id}
                className="border-b py-2 flex items-center gap-2"
              >
                📎 {arq.nome_arquivo}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">Nenhum arquivo anexado ainda.</p>
        )}
      </div>
    </div>
  )
}

export default EventoDetalhes
