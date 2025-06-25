const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const convidadoRoutes = require("./routes/convidadoRoutes");
const colaboradorRoutes = require("./routes/colaboradorRoutes");
const fornecedorRoutes = require("./routes/fornecedorRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/convidados", convidadoRoutes);
app.use("/api", colaboradorRoutes);
app.use("/api", fornecedorRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
