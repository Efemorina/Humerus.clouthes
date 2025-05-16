// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/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'; // kendi URL'inle değiştir

app.post('/notify', async (req, res) => {
  const { name, product, amount, address } = req.body;

  const message = {
    text: `🛒 Yeni Sipariş\nAd: ${name}\nÜrün: ${product}\nTutar: ${amount}₺\nAdres: ${address}`,
  };

  try {
    await axios.post(SLACK_WEBHOOK_URL, message);
    res.status(200).send({ success: true });
  } catch (err) {
    res.status(500).send({ success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Slack bildirim sunucusu çalışıyor: http://localhost:${PORT}`);
});
