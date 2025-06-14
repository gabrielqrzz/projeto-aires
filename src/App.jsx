import { Routes, Route } from "react-router-dom"
import GuestRegistration from "./components/CadastroConvidados"

import "./index.css"
import HomePage from "./components/HomePage"
import CadastroColaborador from "./components/CadastroColaboradores"
import CadastroFornecedores from "./components/CadastroFornecedores"

function App() {
  return (
    <>
      <Routes>
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
      </Routes>
    </>
  )
}

export default App
