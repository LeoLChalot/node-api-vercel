require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function initDb() {
  try {
    const client = await pool.connect();
    const creationTableMouvement = `
      CREATE TABLE IF NOT EXISTS mouvements (
        id SERIAL PRIMARY KEY,
        move TEXT NOT NULL,
        action TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;
    await client.query(creationTableMouvement);
    client.release();
    console.log('Table "mouvements" ok');
  } catch (e) {
    console.error('Erreur lors de l\'initialisation de la base de données :', e);
  }
}

module.exports = {
  pool,
  initDb
};
