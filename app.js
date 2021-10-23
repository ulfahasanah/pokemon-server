const express = require('express');
const cors = require('cors')
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const axios = require('axios');
const port = 3000
const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

// Set up Auth0 configuration 
const authConfig = {
  domain: "dev-9khs63qu.us.auth0.com",
  audience: "https://vue-express-api.com"
};

// Create middleware to validate the JWT using express-jwt
const checkJwt = jwt({
  // Provide a signing key based on the key identifier in the header and the signing keys provided by your Auth0 JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
  }),

  // Validate the audience (Identifier) and the issuer (Domain).
  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithms: ["RS256"]
});

// Get random pokemon
app.get('/api/v1/pokemon', checkJwt, async (req, res) => {
    //Random ID Pokemon from 1 - 898 which the response API's available on the API
    const randomId = Math.floor(Math.random() * 898) + 1
    let result = await axios.get("https://pokeapi.co/api/v2/pokemon/" + randomId)
    res.status(200).json(result.data)
});

app.listen(port, () => {
    console.log(`Server started on port ${port}` );
});