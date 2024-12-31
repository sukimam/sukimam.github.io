const express = require('express');
const cors = require('cors'); // To allow cross-origin requests
const fetch = require('node-fetch'); // For fetching the external resource

const app = express();

// Enable CORS for all routes (can restrict it to specific origins if needed)
app.use(cors());

// Proxy route to fetch manifest.json
app.get('/proxy/manifest', async (req, res) => {
    try {
        // Fetch the manifest.json from the external URL
        const response = await fetch('https://github.com/sukimam.github.io/images/manifest.json');
        
        if (!response.ok) {
            return res.status(response.status).send(`Error fetching manifest: ${response.statusText}`);
        }

        // Get the content of the response
        const data = await response.text();

        // Set response headers and send the data
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Proxy server running on http://localhost:${PORT}`);
});
