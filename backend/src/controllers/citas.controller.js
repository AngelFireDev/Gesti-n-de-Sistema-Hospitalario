import { pool } from '../config/db.js';
import asyncHandler from '../utils/asyncHandler.js';

function parseId(id) {
  const parsed = Number(id);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
}

export const listCitas = asyncHandler(async (req, res) => {
  const [rows] = await pool.query(
    `SELECT c.*, CONCAT(p.nombre, ' ', p.apellido) AS paciente, CONCAT(m.nombre, ' ', m.apellido) AS medico, h.nombre AS hospital
     FROM citas_medicas c
     INNER JOIN pacientes p ON p.id_paciente = c.id_paciente
     INNER JOIN medicos m ON m.id_medico = c.id_medico
     LEFT JOIN hospitales h ON h.id_hospital = c.id_hospital
     ORDER BY c.id_cita DESC`
  );

  res.json(rows);
});

export const getCitaById = asyncHandler(async (req, res) => {
  const id = parseId(req.params.id);
  if (!id) {
    return res.status(400).json({ message: 'ID invalido' });
  }

  const [rows] = await pool.query('SELECT * FROM citas_medicas WHERE id_cita = ?', [id]);
  if (rows.length === 0) {
    return res.status(404).json({ message: 'Cita no encontrada' });
  }

  return res.json(rows[0]);
});

export const createCita = asyncHandler(async (req, res) => {
  const { id_paciente, id_medico, id_hospital, fecha, hora, motivo, estado } = req.body;

  const [result] = await pool.query(
    `INSERT INTO citas_medicas
      (id_paciente, id_medico, id_hospital, fecha, hora, motivo, estado)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      id_paciente,
      id_medico,
      id_hospital || null,
      fecha,
      hora,
      motivo || null,
      estado || 'Pendiente'
    ]
  );

  const [rows] = await pool.query('SELECT * FROM citas_medicas WHERE id_cita = ?', [result.insertId]);
  return res.status(201).json(rows[0]);
});

export const updateCita = asyncHandler(async (req, res) => {
  const id = parseId(req.params.id);
  if (!id) {
    return res.status(400).json({ message: 'ID invalido' });
  }

  const allowedFields = ['id_paciente', 'id_medico', 'id_hospital', 'fecha', 'hora', 'motivo', 'estado'];

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
    `UPDATE citas_medicas SET ${updates.join(', ')} WHERE id_cita = ?`,
    values
  );

  if (result.affectedRows === 0) {
    return res.status(404).json({ message: 'Cita no encontrada' });
  }

  const [rows] = await pool.query('SELECT * FROM citas_medicas WHERE id_cita = ?', [id]);
  return res.json(rows[0]);
});

export const deleteCita = asyncHandler(async (req, res) => {
  const id = parseId(req.params.id);
  if (!id) {
    return res.status(400).json({ message: 'ID invalido' });
  }

  const [result] = await pool.query('DELETE FROM citas_medicas WHERE id_cita = ?', [id]);

  if (result.affectedRows === 0) {
    return res.status(404).json({ message: 'Cita no encontrada' });
  }

  return res.status(204).send();
});
