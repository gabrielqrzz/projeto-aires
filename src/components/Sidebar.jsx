import SidebarButton from "./SidebarButton"

const Sidebar = () => {
  return (
    <div className="h-screen min-w-72 bg-brand-red">
      <div className="space-y-2 px-8 py-12">
        <div className=" flex">
          <h1 className="text-lg font-bold text-brand-white ">ISG</h1>
          <img src="/logo.png" alt="Logo" className="w-8 h-auto ml-4" />
        </div>
        <p className="text-brand-white font-semibold">Participações S.A. </p>

        <div className="flex flex-col gap-2 p-2 px-0 pt-10">
          <SidebarButton>
            <img src="/home.png" alt="home" className="w-8 h-auto" />
            Home
          </SidebarButton>
          <SidebarButton>
            <img src="/groups.png" alt="home" className="w-8 h-auto" />
            Grupos
          </SidebarButton>
          <SidebarButton>
            <img src="/boxes.png" alt="home" className="w-8 h-auto" />
            Boxes
          </SidebarButton>
          <SidebarButton>
            <img src="/calendar.png" alt="home" className="w-8 h-auto" />
            Calendário
          </SidebarButton>
          <SidebarButton>
            <img src="/analise.png" alt="home" className="w-8 h-auto" />
            Análise
          </SidebarButton>
          <SidebarButton>
            <img src="/comentários.png" alt="home" className="w-8 h-auto" />
            Comentários
          </SidebarButton>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
