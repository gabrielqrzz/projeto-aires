import express from "express"
import cors from "cors"
import morgan from "morgan"
import eventosRoutes from "./routes/eventos.js"
import convidadosRoutes from "./routes/convidados.js"
import colaboradoresRoutes from "./routes/colaboradores.js"
import fornecedoresRoutes from "./routes/fornecedores.js"

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

// Pasta pública para uploads
app.use("/uploads", express.static("uploads"))

// Rotas

app.use("/api/colaboradores", colaboradoresRoutes)
app.use("/api/convidados", convidadosRoutes)
app.use("/api/fornecedores", fornecedoresRoutes)
app.use("/api", eventosRoutes)

export default app
