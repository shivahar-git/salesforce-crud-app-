const axios = require("axios");

const SALESFORCE_LOGIN_URL =
  process.env.SALESFORCE_LOGIN_URL ||
  "https://login.salesforce.com";

const API_VERSION = "v60.0";

/**
 * Exchange OAuth authorization code for
 * Salesforce access token.
 */
async function exchangeCodeForToken(code) {
  const params = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: process.env.SALESFORCE_CLIENT_ID,
    client_secret: process.env.SALESFORCE_CLIENT_SECRET,
    redirect_uri: process.env.SALESFORCE_REDIRECT_URI,
    code
  });

  const response = await axios.post(
    `${SALESFORCE_LOGIN_URL}/services/oauth2/token`,
    params.toString(),
    {
      headers: {
        "Content-Type":
          "application/x-www-form-urlencoded"
      }
    }
  );

  return response.data;
}

/**
 * Create an authenticated Salesforce API client.
 */
function createSalesforceClient(
  accessToken,
  instanceUrl
) {
  return axios.create({
    baseURL:
      `${instanceUrl}/services/data/${API_VERSION}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  });
}

module.exports = {
  exchangeCodeForToken,
  createSalesforceClient,
  API_VERSION
};
