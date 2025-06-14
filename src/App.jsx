import { Routes, Route } from "react-router-dom"
import GuestRegistration from "./components/CadastroConvidados"

import "./index.css"
import HomePage from "./components/HomePage"

function App() {
  return (
    <>
      <Routes>
        <Route path="/cadastroConvidados" element={<GuestRegistration />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  )
}

export default App
