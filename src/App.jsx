import { Routes, Route } from "react-router-dom"
import GuestRegistration from "./components/CadastroConvidados"

import "./index.css"
import HomePage from "./components/HomePage"
import CadastroColaborador from "./components/CadastroColaboradores"

function App() {
  return (
    <>
      <Routes>
        <Route path="/cadastroConvidados" element={<GuestRegistration />} />
        <Route path="/colaboradores" element={<CadastroColaborador />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  )
}

export default App
