const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(cors());

let mouvement = { "move": "STAY", "action": "NONE" };
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

app.get('/action', (req, res) => {

  // res.status(200).json(generateRandomMovement());
  res.send(200).json(mouvement)
});

app.post('/action', (req, res) => {
  const { move, action } = req.body;
  if (moves.includes(move) && actions.includes(action)) {
    mouvement = { move, action };
    console.log('Mouvement reçu et enregistré :', mouvement);
    res.status(200).json({ message: "Mouvement enregistré avec succès.", current: mouvement });
  } else {
    console.warn('Mouvement non valide. Aucune modification.');
    res.status(400).json({ message: "Mouvement ou action non valide." });
  }
});

app.listen(3000, () => console.log('Server ready on port 3000.'));

module.exports = app;