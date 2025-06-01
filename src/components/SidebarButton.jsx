const SidebarButton = ({ icon, text, active = false, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 py-4 px-4 rounded-lg font-semibold cursor-pointer transition-colors select-none
        ${active ? "bg-brand-white text-brand-red" : "text-brand-white hover:bg-brand-white/10"}`}
    >
      <div
        className={`text-xl ${active ? "text-brand-red" : "text-brand-white"}`}
      >
        {icon}
      </div>
      {text}
    </div>
  )
}

export default SidebarButton
