import { pool } from '../config/db.js';
import asyncHandler from '../utils/asyncHandler.js';

function parseId(id) {
  const parsed = Number(id);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
}

export const listPacientes = asyncHandler(async (req, res) => {
  const [rows] = await pool.query(
    `SELECT
      p.id_paciente AS id,
      CONCAT(p.nombre, ' ', p.apellido) AS nombre,
      TIMESTAMPDIFF(YEAR, p.fecha_nacimiento, CURDATE()) AS edad,
      (
        SELECT hm.diagnostico
        FROM historial_medico hm
        WHERE hm.id_paciente = p.id_paciente
        ORDER BY hm.id_historial DESC
        LIMIT 1
      ) AS diagnostico,
      p.documento,
      p.apellido,
      p.fecha_nacimiento,
      p.genero,
      p.telefono,
      p.direccion,
      p.email,
      p.tipo_sangre,
      p.fecha_registro
    FROM pacientes p
    ORDER BY p.id_paciente DESC`
  );
  res.json(rows);
});

export const getPacienteById = asyncHandler(async (req, res) => {
  const id = parseId(req.params.id);
  if (!id) {
    return res.status(400).json({ message: 'ID invalido' });
  }

  const [rows] = await pool.query(
    `SELECT
      p.id_paciente AS id,
      CONCAT(p.nombre, ' ', p.apellido) AS nombre,
      TIMESTAMPDIFF(YEAR, p.fecha_nacimiento, CURDATE()) AS edad,
      (
        SELECT hm.diagnostico
        FROM historial_medico hm
        WHERE hm.id_paciente = p.id_paciente
        ORDER BY hm.id_historial DESC
        LIMIT 1
      ) AS diagnostico,
      p.documento,
      p.apellido,
      p.fecha_nacimiento,
      p.genero,
      p.telefono,
      p.direccion,
      p.email,
      p.tipo_sangre,
      p.fecha_registro
    FROM pacientes p
    WHERE p.id_paciente = ?`,
    [id]
  );
  if (rows.length === 0) {
    return res.status(404).json({ message: 'Paciente no encontrado' });
  }

  return res.json(rows[0]);
});

export const createPaciente = asyncHandler(async (req, res) => {
  const {
    documento,
    nombre,
    apellido,
    fecha_nacimiento,
    genero,
    telefono,
    direccion,
    email,
    tipo_sangre
  } = req.body;

  const [result] = await pool.query(
    `INSERT INTO pacientes
      (documento, nombre, apellido, fecha_nacimiento, genero, telefono, direccion, email, tipo_sangre)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      documento,
      nombre,
      apellido,
      fecha_nacimiento || null,
      genero || null,
      telefono || null,
      direccion || null,
      email || null,
      tipo_sangre || null
    ]
  );

  const [rows] = await pool.query('SELECT * FROM pacientes WHERE id_paciente = ?', [result.insertId]);
  rows[0].id = rows[0].id_paciente;
  return res.status(201).json(rows[0]);
});

export const updatePaciente = asyncHandler(async (req, res) => {
  const id = parseId(req.params.id);
  if (!id) {
    return res.status(400).json({ message: 'ID invalido' });
  }

  const allowedFields = [
    'documento',
    'nombre',
    'apellido',
    'fecha_nacimiento',
    'genero',
    'telefono',
    'direccion',
    'email',
    'tipo_sangre'
  ];

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
    `UPDATE pacientes SET ${updates.join(', ')} WHERE id_paciente = ?`,
    values
  );

  if (result.affectedRows === 0) {
    return res.status(404).json({ message: 'Paciente no encontrado' });
  }

  const [rows] = await pool.query('SELECT * FROM pacientes WHERE id_paciente = ?', [id]);
  rows[0].id = rows[0].id_paciente;
  return res.json(rows[0]);
});

export const deletePaciente = asyncHandler(async (req, res) => {
  const id = parseId(req.params.id);
  if (!id) {
    return res.status(400).json({ message: 'ID invalido' });
  }

  const [result] = await pool.query('DELETE FROM pacientes WHERE id_paciente = ?', [id]);

  if (result.affectedRows === 0) {
    return res.status(404).json({ message: 'Paciente no encontrado' });
  }

  return res.status(204).send();
});
