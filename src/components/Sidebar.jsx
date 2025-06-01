const Sidebar = () => {
  return (
    <div className="h-screen min-w-72 bg-brand-red">
      <div className="space-y-2 px-8 py-6">
        <div className=" flex">
          <h1 className="text-lg font-bold text-brand-white ">ISG</h1>
          <img src="/logo.png" alt="Logo" className="w-8 h-auto ml-4" />
        </div>

        <p className="text-brand-white font-semibold">Participações S.A. </p>
      </div>
    </div>
  )
}

export default Sidebar
