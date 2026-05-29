import { pool } from '../config/db.js';
import asyncHandler from '../utils/asyncHandler.js';

function parseId(id) {
  const parsed = Number(id);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
}

export const listMedicos = asyncHandler(async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM medicos ORDER BY id_medico DESC');
  res.json(rows);
});

export const getMedicoById = asyncHandler(async (req, res) => {
  const id = parseId(req.params.id);
  if (!id) {
    return res.status(400).json({ message: 'ID invalido' });
  }

  const [rows] = await pool.query('SELECT * FROM medicos WHERE id_medico = ?', [id]);
  if (rows.length === 0) {
    return res.status(404).json({ message: 'Medico no encontrado' });
  }

  return res.json(rows[0]);
});

export const createMedico = asyncHandler(async (req, res) => {
  const { nombre, apellido, especialidad, telefono, email, consultorio, estado } = req.body;

  const [result] = await pool.query(
    `INSERT INTO medicos
      (nombre, apellido, especialidad, telefono, email, consultorio, estado)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      nombre,
      apellido,
      especialidad || null,
      telefono || null,
      email || null,
      consultorio || null,
      estado || 'Activo'
    ]
  );

  const [rows] = await pool.query('SELECT * FROM medicos WHERE id_medico = ?', [result.insertId]);
  return res.status(201).json(rows[0]);
});

export const updateMedico = asyncHandler(async (req, res) => {
  const id = parseId(req.params.id);
  if (!id) {
    return res.status(400).json({ message: 'ID invalido' });
  }

  const allowedFields = ['nombre', 'apellido', 'especialidad', 'telefono', 'email', 'consultorio', 'estado'];

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
    `UPDATE medicos SET ${updates.join(', ')} WHERE id_medico = ?`,
    values
  );

  if (result.affectedRows === 0) {
    return res.status(404).json({ message: 'Medico no encontrado' });
  }

  const [rows] = await pool.query('SELECT * FROM medicos WHERE id_medico = ?', [id]);
  return res.json(rows[0]);
});

export const deleteMedico = asyncHandler(async (req, res) => {
  const id = parseId(req.params.id);
  if (!id) {
    return res.status(400).json({ message: 'ID invalido' });
  }

  const [result] = await pool.query('DELETE FROM medicos WHERE id_medico = ?', [id]);

  if (result.affectedRows === 0) {
    return res.status(404).json({ message: 'Medico no encontrado' });
  }

  return res.status(204).send();
});
