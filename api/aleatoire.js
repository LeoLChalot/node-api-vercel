const moves = ["UP", "DOWN", "RIGHT", "LEFT", "STAY"];
const actions = ["COLLECT", "ATTACK", "BOMB", "NONE"];

function mouvementAleatoire() {
  const randomMoveIndex = Math.floor(Math.random() * moves.length);
  const randomActionIndex = Math.floor(Math.random() * actions.length);
  return {
    move: moves[randomMoveIndex],
    action: actions[randomActionIndex]
  };
}

module.exports = mouvementAleatoire