require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');

const app = express();

const PORT = process.env.PORT || 3000;

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  charset: 'utf8mb4',
});

app.get('/clientes', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, nombre, apellidos, ciudad FROM clientes');
    res.json(rows);
  } catch (err) {
    console.error('Error al consultar clientes:', err);
    res.status(500).json({ error: 'Error al obtener clientes' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend escuchando en puerto ${PORT}`);
});
