const express = require('express');
const cors = require('cors')
const jwt = require("express-jwt"); // NEW
const jwksRsa = require("jwks-rsa"); // NEW
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

// For this app, we only want to protect the route that returns the details of an event
app.get('/', checkJwt, (req, res) => {
    res.send(".....hello world.....")
});

app.listen(port, () => {
    console.log(`Server started on port ${port}` );
});