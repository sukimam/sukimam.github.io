const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/proxy/manifest', async (req, res) => {
    const fetch = await import('node-fetch');
    const response = await fetch.default('https://sukimam.github.io/images/manifest.json');
    const data = await response.text();
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
});

app.listen(3000, () => console.log('Proxy server running on port 3000'));
