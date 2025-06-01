import { useState } from "react"
import SidebarButton from "./SidebarButton"
import {
  FaHome,
  FaUsers,
  FaBoxes,
  FaCalendarAlt,
  FaChartLine,
  FaCommentDots,
} from "react-icons/fa"

const Sidebar = () => {
  const [active, setActive] = useState("Home")

  return (
    <div className="h-screen min-w-72 bg-brand-red">
      <div className="space-y-2 px-8 py-12">
        <div className="flex">
          <h1 className="text-lg font-bold text-brand-white">ISG</h1>
          <img src="/logo.png" alt="Logo" className="w-8 h-auto ml-4" />
        </div>
        <p className="text-brand-white font-semibold">Participações S.A.</p>

        <div className="flex flex-col gap-10 p-2 px-0 pt-10">
          <SidebarButton
            icon={<FaHome />}
            text="Home"
            active={active === "Home"}
            onClick={() => setActive("Home")}
          />
          <SidebarButton
            icon={<FaUsers />}
            text="Grupos"
            active={active === "Grupos"}
            onClick={() => setActive("Grupos")}
          />
          <SidebarButton
            icon={<FaBoxes />}
            text="Boxes"
            active={active === "Boxes"}
            onClick={() => setActive("Boxes")}
          />
          <SidebarButton
            icon={<FaCalendarAlt />}
            text="Calendário"
            active={active === "Calendário"}
            onClick={() => setActive("Calendário")}
          />
          <SidebarButton
            icon={<FaChartLine />}
            text="Análise"
            active={active === "Análise"}
            onClick={() => setActive("Análise")}
          />
          <SidebarButton
            icon={<FaCommentDots />}
            text="Comentários"
            active={active === "Comentários"}
            onClick={() => setActive("Comentários")}
          />
        </div>
      </div>
    </div>
  )
}

export default Sidebar
