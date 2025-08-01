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

    console.log(res)

    if (!res.ok) {
      throw new Error(`Erreur HTTP : ${res.status}`);
    }

    const result = await res.json();
    resultDisplay.innerHTML = `<pre class="mt-2 text-sm">${JSON.stringify(result, null, 2)}</pre>`;
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'action :', error);
    resultDisplay.innerHTML = `<p class="text-red-400">Erreur lors de l'envoi : ${error.message}</p>`;
  }
}

sendButton.addEventListener('click', envoyerLeMouvement);

// const sendButton = document.getElementById('sendButton');
// const moveSelect = document.getElementById('move');
// const actionSelect = document.getElementById('action');
// const resultDisplay = document.getElementById('resultDisplay');

// const apiBaseUrl = 'https://node-api-vercel-teal-phi.vercel.app';


// async function sendAction() {
//   const dataToSend = {
//     move: moveSelect.value,
//     action: actionSelect.value
//   };

//   try {
//     const response = await fetch(`${apiBaseUrl}/action`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(dataToSend)
//     });

//     if (!response.ok) {
//       throw new Error(`Erreur HTTP : ${response.status}`);
//     }

//     const result = await response.json();
//     resultDisplay.innerHTML = `<pre class="mt-2 text-sm">${JSON.stringify(result, null, 2)}</pre>`;
//   } catch (error) {
//     console.error('Erreur lors de l\'envoi de l\'action :', error);
//     resultDisplay.innerHTML = `<p class="text-red-400">Erreur lors de l'envoi : ${error.message}</p>`;
//   }
// }


// sendButton.addEventListener('click', sendAction);