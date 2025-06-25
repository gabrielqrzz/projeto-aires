import React from "react"
import Sidebar from "./Sidebar"
import { FaUsers, FaCalendarAlt, FaUserPlus, FaBuilding } from "react-icons/fa"

const HomePage = () => {
  return (
    <div className="h-screen flex">
      <Sidebar />
      <div className="flex-1 p-10 mt-20 bg-white">
        <h1 className="text-2xl font-bold text-brand-red mb-6">
          Bem-vindo ao Sistema de Gerenciamento de Eventos
        </h1>

        {/* Painel de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          <div className="bg-brand-red text-white p-6 rounded-2xl shadow-md flex items-center gap-4">
            <FaCalendarAlt size={32} />
            <div>
              <p className="text-sm">Total de Eventos</p>
              <p className="text-xl font-semibold">12</p>
            </div>
          </div>

          <div className="bg-brand-red text-white p-6 rounded-2xl shadow-md flex items-center gap-4">
            <FaUsers size={32} />
            <div>
              <p className="text-sm">Colaboradores</p>
              <p className="text-xl font-semibold">48</p>
            </div>
          </div>

          <div className="bg-brand-red text-white p-6 rounded-2xl shadow-md flex items-center gap-4">
            <FaUserPlus size={32} />
            <div>
              <p className="text-sm">Convidados</p>
              <p className="text-xl font-semibold">87</p>
            </div>
          </div>

          <div className="bg-brand-red text-white p-6 rounded-2xl shadow-md flex items-center gap-4">
            <FaBuilding size={32} />
            <div>
              <p className="text-sm">Fornecedores</p>
              <p className="text-xl font-semibold">5</p>
            </div>
          </div>
        </div>

        {/* Ações rápidas */}
        <h2 className="text-xl font-semibold text-brand-red mb-4">
          Ações Rápidas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-white border border-brand-red text-brand-red rounded-xl py-4 px-6 font-semibold hover:bg-brand-red hover:text-white transition">
            + Novo Evento
          </button>
          <button className="bg-white border border-brand-red text-brand-red rounded-xl py-4 px-6 font-semibold hover:bg-brand-red hover:text-white transition">
            + Cadastrar Convidado
          </button>
          <button className="bg-white border border-brand-red text-brand-red rounded-xl py-4 px-6 font-semibold hover:bg-brand-red hover:text-white transition">
            + Cadastrar Colaborador
          </button>
        </div>
      </div>
    </div>
  )
}

export default HomePage
