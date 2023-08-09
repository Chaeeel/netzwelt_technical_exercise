const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch'); // Install the 'node-fetch' package: npm install node-fetch

const app = express();
const port = 3000; // Choose a port for your proxy server

app.use(bodyParser.json());

// CORS middleware to allow requests from your front-end domain
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'C:/Users/janmi/OneDrive/Documents/GitHub/netzwelt_technical_exercise/TechEx/login.html');
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Proxy route to forward requests to the API server
app.all('/api/*', async (req, res) => {
    const url = `https://netzwelt-devtest.azurewebsites.net${req.originalUrl.replace('/api', '')}`;
    try {
        const response = await fetch(url, {
            method: req.method,
            headers: req.headers,
            body: JSON.stringify(req.body)
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error in proxy:', error);
        res.status(500).json({ error: 'An error occurred in the proxy' });
    }
});

app.listen(port, () => {
    console.log(`Proxy server is running on port ${port}`);
});
