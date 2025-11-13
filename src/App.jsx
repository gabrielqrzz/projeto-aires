import { Routes, Route } from "react-router-dom"
import GuestRegistration from "./components/CadastroConvidados"

import "./index.css"
import HomePage from "./components/HomePage"
import CadastroColaborador from "./components/CadastroColaboradores"
import CadastroFornecedores from "./components/CadastroFornecedores"
import Login from "./components/Login"
import Cadastro from "./components/Cadastro"
import EventosPage from "./components/EventosPage"

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/cadastroConvidados" element={<GuestRegistration />} />
        <Route
          path="/cadastroColaboradores"
          element={<CadastroColaborador />}
        />
        <Route
          path="/cadastroFornecedores"
          element={<CadastroFornecedores />}
        />
        <Route path="/" element={<HomePage />} />
        <Route path="/eventos" element={<EventosPage />} />
      </Routes>
    </>
  )
}

export default App
