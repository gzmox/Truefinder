
function lookupNumber() {
    const phone = document.getElementById("phoneInput").value.trim();
    const resultBox = document.getElementById("result");

    if (!phone) {
        alert("Please enter a phone number.");
        return;
    }

    // Simulated lookup data (mock)
    const fakeData = {
        number: phone,
        name: "Unknown",
        location: "Oslo, Norway",
        carrier: "Telenor",
        spamReports: 13,
        tags: ["Fake job offer", "Robocall"]
    };

    const html = \`
        <h2>Lookup Result</h2>
        <p><strong>📞 Number:</strong> \${fakeData.number}</p>
        <p><strong>👤 Possible Name:</strong> \${fakeData.name}</p>
        <p><strong>📍 Location:</strong> \${fakeData.location}</p>
        <p><strong>📶 Carrier:</strong> \${fakeData.carrier}</p>
        <p><strong>🚨 Spam Reports:</strong> \${fakeData.spamReports}</p>
        <p><strong>🗣 Tags:</strong> \${fakeData.tags.join(", ")}</p>
    \`;

    resultBox.innerHTML = html;
    resultBox.classList.remove("hidden");
}
