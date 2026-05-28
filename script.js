async function checkNumber() {
  const number = document.getElementById("number").value.trim();
  const resultBox = document.getElementById("result");

  if (!number) {
    resultBox.className = "result error";
    resultBox.innerHTML = "Veuillez entrer un numéro.";
    return;
  }

  resultBox.className = "result";
  resultBox.innerHTML = "Vérification...";
  resultBox.classList.remove("hidden");

  try {

    // Remplace cette URL par ton backend Railway/Render
    const API = "https://YOUR-BACKEND-URL/api/check?number=" + number;

    const response = await fetch(API);
    const data = await response.json();

    if (data.exists) {
      resultBox.className = "result success";

      resultBox.innerHTML = `
        <h3>NUMÉRO ACTIF</h3>
        <p><strong>Numéro:</strong> ${data.number}</p>
        <p><strong>WhatsApp:</strong> Oui</p>
      `;
    } else {
      resultBox.className = "result error";

      resultBox.innerHTML = `
        <h3>NUMÉRO INVALIDE</h3>
        <p>${data.message || "Numéro introuvable"}</p>
      `;
    }

  } catch (err) {

    resultBox.className = "result error";

    resultBox.innerHTML = `
      <h3>ERREUR API</h3>
      <p>Impossible de joindre le backend.</p>
    `;
  }
}