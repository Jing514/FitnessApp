const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user:     'postgres',
  host:     'localhost',
  database: 'postgres',
  password: '1234',
  port:     5432,
});

async function query(text, params) {
  const client = await pool.connect();
  try { return await client.query(text, params); }
  finally { client.release(); }
}

app.get('/api/items', async (req, res) => {
  try {
    const { rows } = await query('SELECT * FROM items');
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/items', async (req, res) => {
  const { name, description } = req.body;
  try {
    const { rows } = await query(
      'INSERT INTO items(name,description) VALUES($1,$2) RETURNING *',
      [name, description]
    );
    res.status(201).json(rows[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`API listening on ${PORT}`));
