async function lookupNumber() {
  const phone = document.getElementById("phoneInput").value.trim();
  const resultBox = document.getElementById("result");
  if (!phone) return alert("Du må skrive et telefonnummer!");

  resultBox.innerHTML = 'Laster...';
  resultBox.classList.remove("hidden");

  try {
    const resp = await fetch('/lookup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone })
    });
    const d = await resp.json();
    if (d.error) throw new Error(d.error);

    const html = `
      <h2>Resultat</h2>
      <p><strong>📞 Nummer:</strong> ${phone}</p>
      <p><strong>📍 Lokasjon:</strong> ${d.country_code}, ${d.location}</p>
      <p><strong>📶 Carrier:</strong> ${d.carrier}</p>
      <p><strong>📱 Linjetype:</strong> ${d.line_type}</p>
      <p><strong>🚨 Spam score:</strong> ${d.fraud_score || d.risk_score}</p>
      <p><strong>👤 Navn (CNAM):</strong> ${d.name || 'Ukjent'}</p>
    `;
    resultBox.innerHTML = html;
  } catch (e) {
    resultBox.innerHTML = `<p style="color:red;">Feil: ${e.message}</p>`;
  }
}
