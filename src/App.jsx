import { useState } from "react"
import InputWithLabel from "./components/InputWithLabel"
import Sidebar from "./components/Sidebar"
import "./index.css"

function App() {
  const [email, setEmail] = useState("")
  return (
    <div className="flex">
      <Sidebar />
      <div className="">
        <InputWithLabel
          label="Email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu email"
        />
      </div>
    </div>
  )
}

export default App
