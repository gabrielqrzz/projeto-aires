const SidebarButton = ({ icon, text, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-2 rounded-lg font-semibold ${
        active ? "bg-brand-white text-brand-red" : "text-brand-white"
      }`}
    >
      <span className="text-lg">{icon}</span>
      {text}
    </button>
  )
}

export default SidebarButton
