// main.js
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzzJ-1vuFv7ha9acNfcNmOogUVkwFGgdvN7PjdP1DVIe-F4iF86A3EFgXUm9pTUuSFC/exec';

document.getElementById('motoForm').addEventListener('submit', async e => {
  e.preventDefault();
  const marque = document.getElementById('marque').value;
  const annee = parseInt(document.getElementById('annee').value, 10);
  const kilometrage = parseInt(document.getElementById('kilometrage').value, 10);

  // Envoi des données au back‑end Apps Script
  await fetch(SCRIPT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ marque, annee, kilometrage })
  });

  // Récupération des résultats calculés
  const response = await fetch(SCRIPT_URL);
  const data = await response.json();

  // Affichage dynamique
  const results = document.getElementById('results');
  results.innerHTML = '';
  for (const [key, value] of Object.entries(data)) {
    const card = document.createElement('div');
    card.className = 'card';
    const title = document.createElement('h2');
    title.textContent = key.replace(/_/g, ' ').toUpperCase();
    const val = document.createElement('p');
    val.textContent = 
      typeof value === 'number' 
        ? value.toLocaleString() + ' €' 
        : value;
    card.append(title, val);
    results.appendChild(card);
  }
});
