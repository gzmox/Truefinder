
const express = require('express');
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const path = require('path');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Serve index.html statisk
app.use(express.static(__dirname));

// Serve '/' direkte
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// API: /lookup
app.post('/lookup', async (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ error: 'Phone number is required' });

  const cleaned = phone.replace(/\D/g, '');
  const tellowsUrl = `https://www.tellows.no/num/${cleaned}`;

  try {
    const response = await fetch(tellowsUrl);
    const html = await response.text();
    const $ = cheerio.load(html);

    const score = $('.score').first().text().trim();
    const name = $('.number_detail h1').text().trim();
    const type = $('.number_detail_rating h2').text().trim();
    const comment = $('.report_text').first().text().trim();

    res.json({
      number: phone,
      name: name || 'Ukjent',
      score: score || 'Ingen',
      type: type || 'Ingen info',
      comment: comment || 'Ingen kommentar'
    });
  } catch (err) {
    res.status(500).json({ error: 'Kunne ikke hente data fra Tellows.' });
  }
});

app.listen(PORT, () => console.log(`✅ Server kjører på port ${PORT}`));
