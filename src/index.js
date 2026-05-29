import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import inscripcionRoutes from './routes/inscripcion.js';

dotenv.config();

const app = express();

app.use(cors({ origin: '*', methods: ['GET', 'POST'] }));
app.use(express.json());

app.get('/', (req, res) => res.json({ status: 'ok' }));
app.use('/inscripciones', inscripcionRoutes);

process.on('uncaughtException', (err) => {
  console.error('CRASH:', err.message);
  console.error(err.stack);
});

process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED:', err.message);
  console.error(err.stack);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor en puerto ${PORT}`);
});
