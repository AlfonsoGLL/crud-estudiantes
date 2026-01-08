const db = require('./db');
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => res.send('API'));

app.get('/estudiantes', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM estudiantes');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener estudiantes' });
  }
});

app.post('/estudiantes', async (req, res) => {
  try {
    const { codigo, nombre_completo, carrera, email } = req.body;
    if (!codigo || !nombre_completo || !carrera || !email) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }
    const [result] = await db.query(
      'INSERT INTO estudiantes (codigo, nombre_completo, carrera, email) VALUES (?, ?, ?, ?)',
      [codigo, nombre_completo, carrera, email]
    );
    res.status(201).json({ id: result.insertId, codigo, nombre_completo, carrera, email });
  } catch (error) {
    console.error(error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Código o email ya existe' });
    }
    res.status(500).json({ message: 'Error al crear estudiante' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// UPDATE
app.put('/estudiantes/:id', async (req, res) => {
  const { id } = req.params;
  const { codigo, nombre_completo, carrera, email } = req.body;
  if (!codigo || !nombre_completo || !carrera || !email) {
    return res.status(400).json({ message: 'Faltan campos obligatorios' });
  }
  try {
    const [result] = await db.query(
      `UPDATE estudiantes
       SET codigo = ?, nombre_completo = ?, carrera = ?, email = ?
       WHERE id = ?`,
      [codigo, nombre_completo, carrera, email, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Estudiante no encontrado' });
    }
    res.json({ message: 'Estudiante actualizado correctamente' });
  } catch (error) {
    console.error('ERROR UPDATE:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Código o email ya existe' });
    }
    res.status(500).json({ message: 'Error al actualizar estudiante' });
  }
});

// DELETE
app.delete('/estudiantes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM estudiantes WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Estudiante no encontrado' });
    }
    res.json({ message: 'Estudiante eliminado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar estudiante' });
  }
});
