const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg'); 
require('dotenv').config();
const app = express();

app.use(bodyParser.json());
app.use(cors());


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function initDb() {
  try {
    const client = await pool.connect();
    const queryText = `
      CREATE TABLE IF NOT EXISTS mouvements (
        id SERIAL PRIMARY KEY,
        move TEXT NOT NULL,
        action TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;
    await client.query(queryText);
    client.release();
    console.log('Table "mouvements" vérifiée ou créée avec succès.');
  } catch (err) {
    console.error('Erreur lors de l\'initialisation de la base de données :', err);
  }
}

initDb();

// let mouvement = { "move": "STAY", "action": "NONE" };
const moves = ["UP", "DOWN", "RIGHT", "LEFT", "STAY"];
const actions = ["COLLECT", "ATTACK", "BOMB", "NONE"];

function generateRandomMovement() {
  const randomMoveIndex = Math.floor(Math.random() * moves.length);
  const randomActionIndex = Math.floor(Math.random() * actions.length);
  return {
    move: moves[randomMoveIndex],
    action: actions[randomActionIndex]
  };
}

app.get('/', (req, res) => {
  res.status(200).json({ message: "Hello Bot Trainer !" });
});

app.get('/action', async (req, res) => {
  try {
    const queryText = 'SELECT move, action FROM mouvements ORDER BY created_at DESC LIMIT 1';
    const result = await pool.query(queryText);

    if (result.rows.length > 0) {
      const lastMouvement = result.rows[0];
      console.log('Dernier mouvement récupéré de la BDD :', lastMouvement);
      res.status(200).json(lastMouvement);
    } else {
      console.log('Aucun mouvement trouvé dans la BDD, envoi de la valeur par défaut.');
      res.status(200).json({ move: "STAY", action: "NONE" });
    }
  } catch (err) {
    console.error('Erreur lors de la récupération des données :', err);
    res.status(500).json({ message: "Erreur serveur lors de la récupération." });
  }
});

app.post('/action', async (req, res) => {
  const { move, action } = req.body;

  if (!moves.includes(move) || !actions.includes(action)) {
    console.warn('Mouvement non valide. Aucune modification.');
    return res.status(400).json({ message: "Mouvement ou action non valide." });
  }

  try {
    const queryText = 'INSERT INTO mouvements(move, action) VALUES($1, $2) RETURNING *';
    const values = [move, action];
    const result = await pool.query(queryText, values);
    const newMouvement = result.rows[0];

    console.log('Mouvement enregistré dans la BDD :', newMouvement);
    res.status(200).json({ message: "Mouvement enregistré avec succès.", current: newMouvement });
  } catch (err) {
    console.error('Erreur lors de l\'enregistrement dans la base de données :', err);
    res.status(500).json({ message: "Erreur serveur lors de l'enregistrement." });
  }
});

app.listen(3000, () => console.log('Server ready on port 3000.'));

module.exports = app;