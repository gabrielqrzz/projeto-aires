import { Routes, Route } from "react-router-dom"
import GuestRegistration from "./components/GuestRegistration"

import "./index.css"
import HomePage from "./components/Home"

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
