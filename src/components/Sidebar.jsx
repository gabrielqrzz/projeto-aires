import { useLocation, useNavigate } from "react-router-dom"
import SidebarButton from "./SidebarButton"
import {
  FaHome,
  FaUsers,
  FaUserPlus,
  FaBoxes,
  FaCalendarAlt,
  FaChartLine,
  FaCommentDots,
} from "react-icons/fa"

const Sidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    { text: "Início", icon: <FaHome />, path: "/" },
    { text: "Colaboradores", icon: <FaUsers />, path: "/colaboradores" },
    { text: "Convidados", icon: <FaUserPlus />, path: "/cadastroConvidados" },
    { text: "Fornecedores", icon: <FaBoxes />, path: "/fornecedores" },
    { text: "Eventos", icon: <FaCalendarAlt />, path: "/eventos" },
    { text: "Financeiro", icon: <FaChartLine />, path: "/financeiro" },
    { text: "Conversas", icon: <FaCommentDots />, path: "/conversas" },
  ]

  return (
    <div className="h-screen min-w-72 bg-brand-red">
      <div className="space-y-2 px-8 py-12">
        <div className="flex">
          <h1 className="text-lg font-bold text-brand-white">ISG</h1>
          <img src="/logo.png" alt="Logo" className="w-8 h-auto ml-4" />
        </div>
        <p className="text-brand-white font-semibold">Participações S.A.</p>

        <div className="flex flex-col gap-10 p-2 px-0 pt-10">
          {menuItems.map((item) => (
            <SidebarButton
              key={item.text}
              icon={item.icon}
              text={item.text}
              active={location.pathname === item.path}
              onClick={() => navigate(item.path)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
