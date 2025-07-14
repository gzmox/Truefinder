async function lookupNumber() {
    const phoneInput = document.getElementById("phoneInput").value.trim();
    const resultBox = document.getElementById("result");

    if (!phoneInput) return alert("Du må skrive et telefonnummer!");

    // 1. Fjern alt unntatt tall
    let digits = phoneInput.replace(/\D/g, '');

    // 2. Legg til +47 hvis bare 8 sifre
    if (digits.length === 8) {
        digits = "47" + digits;
    }

    // 3. Legg til + foran
    const formattedNumber = "+" + digits;

    resultBox.innerHTML = 'Laster...';
    resultBox.classList.remove("hidden");

    try {
        const resp = await fetch('/lookup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone: formattedNumber })
        });
        const data = await resp.json();

        if (data.error || data.success === false) throw new Error(data.message || "Ugyldig nummer");

        const html = `
            <h2>Resultat</h2>
            <p><strong>📞 Nummer:</strong> ${formattedNumber}</p>
            <p><strong>📍 Lokasjon:</strong> ${data.country_code}, ${data.location}</p>
            <p><strong>📶 Carrier:</strong> ${data.carrier}</p>
            <p><strong>📱 Linjetype:</strong> ${data.line_type}</p>
            <p><strong>🚨 Spam score:</strong> ${data.fraud_score || data.risk_score}</p>
            <p><strong>👤 Navn (CNAM):</strong> ${data.name || 'Ukjent'}</p>
        `;
        resultBox.innerHTML = html;
    } catch (e) {
        resultBox.innerHTML = `<p style="color:red;">Feil: ${e.message}</p>`;
    }
}
