function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  if (err?.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({ message: 'Registro duplicado' });
  }

  if (err?.code === 'ER_NO_REFERENCED_ROW_2') {
    return res.status(400).json({ message: 'Relacion invalida entre tablas' });
  }

  if (err?.code === 'ER_BAD_NULL_ERROR') {
    return res.status(400).json({ message: 'Faltan campos obligatorios' });
  }

  if (err?.statusCode) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  console.error(err);
  return res.status(500).json({ message: 'Error interno del servidor' });
}

export default errorHandler;
