import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import convidadosRoutes from "./routes/convidados.js"
import colaboradoresRoutes from "./routes/colaboradores.js"
import fornecedoresRoutes from "./routes/fornecedores.js"

const app = express()

app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }))
app.use(helmet())
app.use(express.json())
app.use(morgan("dev"))

app.use("/api/convidados", convidadosRoutes)
app.use("/api/colaboradores", colaboradoresRoutes)
app.use("/api/fornecedores", fornecedoresRoutes)

app.get("/api/health", (req, res) => res.json({ ok: true }))

export default app
