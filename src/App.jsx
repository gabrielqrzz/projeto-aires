import Sidebar from "./components/Sidebar"
import "./index.css"
import GuestRegistration from "./components/GuestRegistration"

function App() {
  return (
    <div className="h-screen flex">
      <Sidebar />
      <div className="flex-1">
        <GuestRegistration />
      </div>
    </div>
  )
}

export default App
