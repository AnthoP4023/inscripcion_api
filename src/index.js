import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors({ origin: '*', methods: ['GET', 'POST'] }));
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => res.json({ status: 'ok' }));

// Importar rutas de forma dinámica
try {
  const { default: inscripcionRoutes } = await import('./routes/inscripcion.js');
  app.use('/inscripciones', inscripcionRoutes);
} catch (err) {
  console.error('Error cargando rutas:', err.message);
  console.error(err.stack);
}

// Capturar crashes
process.on('uncaughtException', (err) => {
  console.error('CRASH:', err.message);
  console.error(err.stack);
});

process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED:', err.message);
  console.error(err.stack);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', (err) => {
  if (err) console.error('Error al iniciar:', err);
  else console.log(`Servidor en puerto ${PORT}`);
});
