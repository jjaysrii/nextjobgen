// LinkedIn API Configuration
const config = {
    linkedIn: {
        clientId: 'YOUR_CLIENT_ID',
        clientSecret: 'YOUR_CLIENT_SECRET',
        redirectUri: 'http://localhost:8000/callback.html',
        scope: ['r_liteprofile', 'r_emailaddress', 'w_member_social', 'r_ads_reporting']
    }
};

export default config;
