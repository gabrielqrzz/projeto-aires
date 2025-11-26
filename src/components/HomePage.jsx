// HomePage.jsx
import React, { useEffect, useState, useRef } from "react"
import Sidebar from "./Sidebar"
import {
  FaUsers,
  FaCalendarAlt,
  FaUserPlus,
  FaBuilding,
  FaChartPie,
  FaStar,
  FaClipboardList,
} from "react-icons/fa"
import { useNavigate } from "react-router-dom"

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js"
import { Doughnut, Bar } from "react-chartjs-2"

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
)

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000"

// helper: anima contador de 0 -> target
function useAnimatedNumber(target, duration = 800) {
  const [value, setValue] = useState(0)
  const rafRef = useRef(null)
  const startRef = useRef(null)
  useEffect(() => {
    cancelAnimationFrame(rafRef.current)
    const start = performance.now()
    startRef.current = start
    const from = 0
    const to = Number(target) || 0
    const animate = (now) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // easeOut cubic
      const current = Math.round(from + (to - from) * eased)
      setValue(current)
      if (progress < 1) rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target, duration])
  return value
}

const HomePage = () => {
  const [totais, setTotais] = useState({
    eventos: 0,
    colaboradores: 0,
    convidados: 0,
    fornecedores: 0,
  })
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    carregarTotais()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function carregarTotais() {
    try {
      setLoading(true)
      const [evRes, colRes, convRes, fornRes] = await Promise.all([
        fetch(`${API_URL}/api/eventos`),
        fetch(`${API_URL}/api/colaboradores`),
        fetch(`${API_URL}/api/convidados`),
        fetch(`${API_URL}/api/fornecedores`),
      ])

      // Se alguma rota retornar 404 ou erro, tratamos com arrays vazios
      const eventos = evRes.ok ? await evRes.json() : []
      const colaboradores = colRes.ok ? await colRes.json() : []
      const convidados = convRes.ok ? await convRes.json() : []
      const fornecedores = fornRes.ok ? await fornRes.json() : []

      setTotais({
        eventos: Array.isArray(eventos) ? eventos.length : 0,
        colaboradores: Array.isArray(colaboradores) ? colaboradores.length : 0,
        convidados: Array.isArray(convidados) ? convidados.length : 0,
        fornecedores: Array.isArray(fornecedores) ? fornecedores.length : 0,
      })
    } catch (error) {
      console.error("Erro ao carregar totais:", error)
    } finally {
      setLoading(false)
    }
  }

  // Animated numbers
  const animEventos = useAnimatedNumber(totais.eventos)
  const animColab = useAnimatedNumber(totais.colaboradores)
  const animConvidados = useAnimatedNumber(totais.convidados)
  const animForns = useAnimatedNumber(totais.fornecedores)

  // Chart data
  const donutData = {
    labels: ["Eventos", "Colaboradores", "Convidados", "Fornecedores"],
    datasets: [
      {
        data: [
          totais.eventos || 0,
          totais.colaboradores || 0,
          totais.convidados || 0,
          totais.fornecedores || 0,
        ],
        backgroundColor: [
          "#ef4444", // brand-red
          "#f97316",
          "#f59e0b",
          "#ef7ab8",
        ],
        hoverOffset: 8,
      },
    ],
  }

  const barData = {
    labels: ["Eventos", "Colaboradores", "Convidados", "Fornecedores"],
    datasets: [
      {
        label: "Quantidade",
        data: [
          totais.eventos || 0,
          totais.colaboradores || 0,
          totais.convidados || 0,
          totais.fornecedores || 0,
        ],
        backgroundColor: "rgba(239,68,68,0.85)",
      },
    ],
  }

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false, text: "Comparativo" },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
      },
    },
  }

  // card click handlers
  const handleGoto = (path) => navigate(path)

  return (
    <div className="h-screen flex">
      <Sidebar />

      <div className="flex-1 mt-16 bg-gray-50 overflow-y-auto min-h-screen">
        {/* HEADER */}
        <header className="w-full bg-white border-b-4 border-brand-red p-8 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="Logo" className="w-14 h-auto" />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-brand-red">
                ISG Participações
              </h1>
              <p className="text-sm text-gray-600">
                Sistema Corporativo de Gestão de Eventos
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => carregarTotais()}
              className="text-sm bg-white border border-brand-red text-brand-red px-3 py-2 rounded-lg shadow-sm hover:bg-brand-red hover:text-white transition"
              title="Atualizar indicadores"
            >
              Atualizar
            </button>
          </div>
        </header>

        {/* BANNER */}
        <section className="p-8">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-brand-red mb-2">
                Painel Geral
              </h2>
              <p className="text-gray-600 leading-relaxed max-w-xl">
                Visão consolidada dos dados do sistema. Clique nos cards para
                navegar rapidamente.
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  onClick={() => handleGoto("/eventos")}
                  className="bg-brand-red text-white px-4 py-2 rounded-full text-sm font-semibold shadow hover:opacity-95 transition"
                >
                  Ir para Eventos
                </button>
                <button
                  onClick={() => handleGoto("/cadastroConvidados")}
                  className="bg-white border border-brand-red text-brand-red px-4 py-2 rounded-full text-sm font-semibold shadow hover:bg-brand-red hover:text-white transition"
                >
                  Cadastrar Convidado
                </button>
              </div>
            </div>

            <img src="/logo.png" alt="Marca" className="w-28 opacity-60" />
          </div>
        </section>

        {/* INDICADORES */}
        <section className="px-8">
          <h3 className="text-xl font-semibold text-brand-red mb-4">
            Indicadores
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Card: Eventos */}
            <div
              onClick={() => handleGoto("/eventos")}
              className="cursor-pointer bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden transform hover:-translate-y-1 transition"
            >
              <div className="w-full h-2 bg-brand-red" />
              <div className="p-5 flex items-center gap-4">
                <FaCalendarAlt className="text-brand-red" size={34} />
                <div>
                  <p className="text-sm text-gray-500">Total de Eventos</p>
                  <p className="text-2xl font-bold text-gray-700">
                    {loading ? "—" : animEventos}
                  </p>
                </div>
              </div>
            </div>

            {/* Card: Colaboradores */}
            <div
              onClick={() => handleGoto("/cadastroColaboradores")}
              className="cursor-pointer bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden transform hover:-translate-y-1 transition"
            >
              <div className="w-full h-2 bg-brand-red" />
              <div className="p-5 flex items-center gap-4">
                <FaUsers className="text-brand-red" size={34} />
                <div>
                  <p className="text-sm text-gray-500">Colaboradores</p>
                  <p className="text-2xl font-bold text-gray-700">
                    {loading ? "—" : animColab}
                  </p>
                </div>
              </div>
            </div>

            {/* Card: Convidados */}
            <div
              onClick={() => handleGoto("/cadastroConvidados")}
              className="cursor-pointer bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden transform hover:-translate-y-1 transition"
            >
              <div className="w-full h-2 bg-brand-red" />
              <div className="p-5 flex items-center gap-4">
                <FaUserPlus className="text-brand-red" size={34} />
                <div>
                  <p className="text-sm text-gray-500">Convidados</p>
                  <p className="text-2xl font-bold text-gray-700">
                    {loading ? "—" : animConvidados}
                  </p>
                </div>
              </div>
            </div>

            {/* Card: Fornecedores */}
            <div
              onClick={() => handleGoto("/cadastroFornecedores")}
              className="cursor-pointer bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden transform hover:-translate-y-1 transition"
            >
              <div className="w-full h-2 bg-brand-red" />
              <div className="p-5 flex items-center gap-4">
                <FaBuilding className="text-brand-red" size={34} />
                <div>
                  <p className="text-sm text-gray-500">Fornecedores</p>
                  <p className="text-2xl font-bold text-gray-700">
                    {loading ? "—" : animForns}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* GRÁFICOS */}
        <section className="px-8 mt-8 mb-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-6">
            <h4 className="font-semibold text-brand-red mb-3">Distribuição</h4>
            <div className="max-w-md mx-auto">
              <Doughnut data={donutData} />
            </div>
            <p className="text-sm text-gray-500 mt-3 text-center">
              Resumo rápido dos principais recursos do sistema.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-6">
            <h4 className="font-semibold text-brand-red mb-3">Comparativo</h4>
            <div style={{ maxHeight: 320 }}>
              <Bar data={barData} options={barOptions} />
            </div>
            <p className="text-sm text-gray-500 mt-3">
              Comparação direta entre eventos, colaboradores, convidados e
              fornecedores.
            </p>
          </div>
        </section>

        {/* AÇÕES RÁPIDAS */}
        <section className="px-8 mb-20">
          <h3 className="text-xl font-semibold text-brand-red mb-4">
            Acesso Rápido
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button
              onClick={() => handleGoto("/eventos")}
              className="bg-white border border-brand-red rounded-2xl py-5 px-6 shadow hover:bg-brand-red hover:text-white transition flex items-center gap-4"
            >
              <FaClipboardList size={24} />
              <span className="font-semibold">Visualizar Eventos</span>
            </button>

            <button className="bg-white border border-brand-red rounded-2xl py-5 px-6 shadow hover:bg-brand-red hover:text-white transition flex items-center gap-4">
              <FaChartPie size={24} />
              <span className="font-semibold">Relatórios</span>
            </button>

            <button className="bg-white border border-brand-red rounded-2xl py-5 px-6 shadow hover:bg-brand-red hover:text-white transition flex items-center gap-4">
              <FaStar size={24} />
              <span className="font-semibold">Área Administrativa</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default HomePage
