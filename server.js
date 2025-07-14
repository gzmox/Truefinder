// server.js
const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.post('/lookup', async (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ error: 'phone missing' });

  try {
    const apiUrl = `https://www.ipqualityscore.com/api/json/phone/${encodeURIComponent(phone)}`;
    const resp = await fetch(apiUrl);
    const data = await resp.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'lookup failed' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
