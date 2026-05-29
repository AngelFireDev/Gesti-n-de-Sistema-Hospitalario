import { pool } from '../config/db.js';
import asyncHandler from '../utils/asyncHandler.js';

function parseId(id) {
  const parsed = Number(id);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
}

export const listHospitales = asyncHandler(async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM hospitales ORDER BY id_hospital DESC');
  res.json(rows);
});

export const getHospitalById = asyncHandler(async (req, res) => {
  const id = parseId(req.params.id);
  if (!id) {
    return res.status(400).json({ message: 'ID invalido' });
  }

  const [rows] = await pool.query('SELECT * FROM hospitales WHERE id_hospital = ?', [id]);
  if (rows.length === 0) {
    return res.status(404).json({ message: 'Hospital no encontrado' });
  }

  return res.json(rows[0]);
});

export const createHospital = asyncHandler(async (req, res) => {
  const { nombre, direccion, telefono, ciudad, estado } = req.body;

  const [result] = await pool.query(
    `INSERT INTO hospitales
      (nombre, direccion, telefono, ciudad, estado)
     VALUES (?, ?, ?, ?, ?)`,
    [nombre, direccion || null, telefono || null, ciudad || null, estado || 'Activo']
  );

  const [rows] = await pool.query('SELECT * FROM hospitales WHERE id_hospital = ?', [result.insertId]);
  return res.status(201).json(rows[0]);
});

export const updateHospital = asyncHandler(async (req, res) => {
  const id = parseId(req.params.id);
  if (!id) {
    return res.status(400).json({ message: 'ID invalido' });
  }

  const allowedFields = ['nombre', 'direccion', 'telefono', 'ciudad', 'estado'];

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
    `UPDATE hospitales SET ${updates.join(', ')} WHERE id_hospital = ?`,
    values
  );

  if (result.affectedRows === 0) {
    return res.status(404).json({ message: 'Hospital no encontrado' });
  }

  const [rows] = await pool.query('SELECT * FROM hospitales WHERE id_hospital = ?', [id]);
  return res.json(rows[0]);
});

export const deleteHospital = asyncHandler(async (req, res) => {
  const id = parseId(req.params.id);
  if (!id) {
    return res.status(400).json({ message: 'ID invalido' });
  }

  const [result] = await pool.query('DELETE FROM hospitales WHERE id_hospital = ?', [id]);

  if (result.affectedRows === 0) {
    return res.status(404).json({ message: 'Hospital no encontrado' });
  }

  return res.status(204).send();
});
