const sendButton = document.getElementById('sendButton');
const resultDisplay = document.getElementById('resultDisplay');
const apiBaseUrl = 'https://node-api-vercel-teal-phi.vercel.app';

async function envoyerLeMouvement() {
  const mouvementBouton = document.querySelector('input[name="move"]:checked');
  const actionBouton = document.querySelector('input[name="action"]:checked');

  const prochainMouvement = {
    move: mouvementBouton ? mouvementBouton.value : "STAY",
    action: actionBouton ? actionBouton.value : "NONE"
  };

  try {
    const res = await fetch(`${apiBaseUrl}/action`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(prochainMouvement)
    });

    console.table(res);


    if (!res.ok) {
      throw new Error(`Erreur ${res.status}`);
    }

    const result = await res.json();

    console.table(result);

    resultDisplay.innerHTML = `<pre class="mt-2 text-sm">${JSON.stringify(result, null, 2)}</pre>`;
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'action :', error);
    resultDisplay.innerHTML = `<p class="text-red-400">Erreur lors de l'envoi : ${error.message}</p>`;
  }
}

sendButton.addEventListener('click', envoyerLeMouvement);


document.addEventListener('keydown', (event) => {
  const key = event.key;
  let moveValue = null;

  console.log(key);

  switch (key) {
    case 'ArrowUp':
      moveValue = 'UP';
      break;
    case 'ArrowDown':
      moveValue = 'DOWN';
      break;
    case 'ArrowLeft':
      moveValue = 'LEFT';
      break;
    case 'ArrowRight':
      moveValue = 'RIGHT';
      break;
    case ' ':
      moveValue = 'STAY';
      break;
  }

  if (moveValue) {
    const radioBouton = document.querySelector(`input[name="move"][value="${moveValue}"]`);
    if (radioBouton) {
      radioBouton.checked = true;
      envoyerLeMouvement();
      event.preventDefault();
    }
  }
});

