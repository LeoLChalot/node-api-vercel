// app.test.js
const app = require('../index');
const mouvementAleatoire = require ('../aleatoire')


describe('Test général des routes / méthodes', () => {

  // Test de la fonction de mouvement aléatoire
  describe('mouvementAleatoire()', () => {
    // Je vérifie que la fonction retourne un objet avec les bonnes propriétés.
    test('devrait retourner un objet avec les propriétés move et action', () => {
      const result = mouvementAleatoire();
      expect(result).toHaveProperty('move');
      expect(result).toHaveProperty('action');
    });

    // Je vérifie que les valeurs de 'move' sont bien celles attendues.
    test('devrait retourner une valeur de move valide', () => {
      const moves = ["UP", "DOWN", "RIGHT", "LEFT", "STAY"];
      const result = mouvementAleatoire();
      expect(moves).toContain(result.move);
    });

    // Je vérifie que les valeurs de 'action' sont bien celles attendues.
    test('devrait retourner une valeur de action valide', () => {
      const actions = ["COLLECT", "ATTACK", "BOMB", "NONE"];
      const result = mouvementAleatoire();
      expect(actions).toContain(result.action);
    });
  });

  // Test des validateurs de mouvement et d'action
  describe('Validation des entrées', () => {
    const moves = ["UP", "DOWN", "RIGHT", "LEFT", "STAY"];
    const actions = ["COLLECT", "ATTACK", "BOMB", "NONE"];

    // Je vais créer un petit "utilitaire" de validation pour l'exemple.
    // C'est ce qui se passe implicitement dans ta route POST.
    function isValidMovement(move, action) {
      return moves.includes(move) && actions.includes(action);
    }

    // Test de validation avec des valeurs correctes.
    test('devrait valider un mouvement et une action correcte', () => {
      expect(isValidMovement("UP", "ATTACK")).toBe(true);
      expect(isValidMovement("STAY", "NONE")).toBe(true);
    });

    // Test de validation avec un mouvement invalide.
    test('ne devrait pas valider un mouvement incorrect', () => {
      expect(isValidMovement("JUMP", "ATTACK")).toBe(false);
    });

    // Test de validation avec une action invalide.
    test('ne devrait pas valider une action incorrecte', () => {
      expect(isValidMovement("UP", "SHOOT")).toBe(false);
    });
  });
});