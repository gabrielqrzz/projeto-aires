import express from 'express';
import cors from 'cors';
import convidadosRoutes from './routes/convidadosRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/convidados', convidadosRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
