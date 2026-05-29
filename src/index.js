import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors({ origin: '*', methods: ['GET', 'POST'] }));
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => res.json({ status: 'ok' }));

// Importar rutas de forma dinámica para capturar errores
try {
  const { default: inscripcionRoutes } = await import('./routes/inscripcion.js');
  app.use('/inscripciones', inscripcionRoutes);
} catch (err) {
  console.error('Error cargando rutas:', err.message);
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`Servidor en puerto ${PORT}`));
