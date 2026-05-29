import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import inscripcionRoutes from './routes/inscripcion.js';

dotenv.config();
const app = express();

// ✅ Permite peticiones desde Netlify
app.use(cors({
  origin: 'https://shiny-manatee-ded3b1.netlify.app',
  methods: ['GET', 'POST'],
}));

app.use(express.json());
app.use('/inscripciones', inscripcionRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
