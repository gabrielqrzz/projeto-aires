const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const guestRoutes = require('./routes/guestRoutes');
const connectDB = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/guests', guestRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
