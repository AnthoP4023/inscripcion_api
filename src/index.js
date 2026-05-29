import dotenv from 'dotenv';
dotenv.config();
import express from 'express';

import inscripcionRoutes from './routes/inscripcion.js'; // ← después
const app = express();

app.use(express.json());
app.use('/inscripciones', inscripcionRoutes);

app.listen(3000, () => console.log('Servidor en puerto 3000'));