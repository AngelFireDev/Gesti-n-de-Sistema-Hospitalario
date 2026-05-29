import { pool } from '../config/db.js';
import asyncHandler from '../utils/asyncHandler.js';

function parseId(id) {
  const parsed = Number(id);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
}

export const listHistorial = asyncHandler(async (req, res) => {
  const [rows] = await pool.query(
    `SELECT h.*, CONCAT(p.nombre, ' ', p.apellido) AS paciente
     FROM historial_medico h
     INNER JOIN pacientes p ON p.id_paciente = h.id_paciente
     ORDER BY h.id_historial DESC`
  );
  res.json(rows);
});

export const getHistorialById = asyncHandler(async (req, res) => {
  const id = parseId(req.params.id);
  if (!id) {
    return res.status(400).json({ message: 'ID invalido' });
  }

  const [rows] = await pool.query('SELECT * FROM historial_medico WHERE id_historial = ?', [id]);
  if (rows.length === 0) {
    return res.status(404).json({ message: 'Registro de historial no encontrado' });
  }

  return res.json(rows[0]);
});

export const listHistorialByPaciente = asyncHandler(async (req, res) => {
  const pacienteId = parseId(req.params.pacienteId);
  if (!pacienteId) {
    return res.status(400).json({ message: 'ID de paciente invalido' });
  }

  const [rows] = await pool.query(
    'SELECT * FROM historial_medico WHERE id_paciente = ? ORDER BY id_historial DESC',
    [pacienteId]
  );

  return res.json(rows);
});

export const createHistorial = asyncHandler(async (req, res) => {
  const { id_paciente, diagnostico, tratamiento, observaciones } = req.body;

  const [result] = await pool.query(
    `INSERT INTO historial_medico
      (id_paciente, diagnostico, tratamiento, observaciones)
     VALUES (?, ?, ?, ?)`,
    [id_paciente, diagnostico || null, tratamiento || null, observaciones || null]
  );

  const [rows] = await pool.query('SELECT * FROM historial_medico WHERE id_historial = ?', [result.insertId]);
  return res.status(201).json(rows[0]);
});

export const updateHistorial = asyncHandler(async (req, res) => {
  const id = parseId(req.params.id);
  if (!id) {
    return res.status(400).json({ message: 'ID invalido' });
  }

  const allowedFields = ['id_paciente', 'diagnostico', 'tratamiento', 'observaciones'];

  const updates = [];
  const values = [];

  for (const field of allowedFields) {
    if (Object.prototype.hasOwnProperty.call(req.body, field)) {
      updates.push(`${field} = ?`);
      values.push(req.body[field]);
    }
  }

  if (updates.length === 0) {
    return res.status(400).json({ message: 'No hay campos para actualizar' });
  }

  values.push(id);

  const [result] = await pool.query(
    `UPDATE historial_medico SET ${updates.join(', ')} WHERE id_historial = ?`,
    values
  );

  if (result.affectedRows === 0) {
    return res.status(404).json({ message: 'Registro de historial no encontrado' });
  }

  const [rows] = await pool.query('SELECT * FROM historial_medico WHERE id_historial = ?', [id]);
  return res.json(rows[0]);
});

export const deleteHistorial = asyncHandler(async (req, res) => {
  const id = parseId(req.params.id);
  if (!id) {
    return res.status(400).json({ message: 'ID invalido' });
  }

  const [result] = await pool.query('DELETE FROM historial_medico WHERE id_historial = ?', [id]);

  if (result.affectedRows === 0) {
    return res.status(404).json({ message: 'Registro de historial no encontrado' });
  }

  return res.status(204).send();
});
