import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import inscripcionRoutes from './routes/inscripcion.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
}));

app.use(express.json());
app.use('/inscripciones', inscripcionRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`Servidor en puerto ${PORT}`));
