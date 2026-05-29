import { Router } from 'express';
import { getRows, appendRow } from '../services/sheets.js';

const router = Router();

// GET - obtener inscripciones
router.get('/', async (req, res) => {
  const rows = await getRows();
  res.json(rows);
});

// POST - crear inscripción
router.post('/', async (req, res) => {
  const { CEDULA, NOMBRE, EDAD, CORREO } = req.body;

  // Validar que vengan todos los campos
  if (!CEDULA || !NOMBRE || !EDAD || !CORREO) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  const rows = await getRows();

  // Verificar que la cédula no exista
  const cedulaExiste = rows.find(row => row.CEDULA === CEDULA);
  if (cedulaExiste) {
    return res.status(400).json({ error: 'La cédula ya está registrada' });
  }

  // Verificar que el correo no exista
  const correoExiste = rows.find(row => row.CORREO === CORREO);
  if (correoExiste) {
    return res.status(400).json({ error: 'El correo ya está registrado' });
  }

  await appendRow([CEDULA, NOMBRE, EDAD, CORREO]);
  res.json({ message: 'Inscripción guardada', data: { CEDULA, NOMBRE, EDAD, CORREO } });
});

export default router;