const express = require('express');
const cors = require('cors');
const axios = require('axios');
const config = require('./config.js');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// LinkedIn OAuth token exchange endpoint
app.post('/api/linkedin/token', async (req, res) => {
    try {
        const { code } = req.body;
        
        // Exchange authorization code for access token
        const response = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', null, {
            params: {
                grant_type: 'authorization_code',
                code: code,
                client_id: config.linkedIn.clientId,
                client_secret: config.linkedIn.clientSecret,
                redirect_uri: config.linkedIn.redirectUri
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error('Token exchange error:', error);
        res.status(500).json({ error: 'Failed to exchange token' });
    }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
