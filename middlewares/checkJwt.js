const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

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

module.exports = checkJwt