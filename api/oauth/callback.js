// Zoho CRM OAuth Callback Handler
// This endpoint handles the OAuth callback from Zoho after authorization

const handler = async (req, res) => {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  try {
    const { code, error } = req.query;

    if (error) {
      return res.status(400).send(`
        <html>
          <head><title>Authorization Error</title></head>
          <body>
            <h1>Authorization Failed</h1>
            <p>Error: ${error}</p>
            <p>Please try again.</p>
          </body>
        </html>
      `);
    }

    if (!code) {
      return res.status(400).send(`
        <html>
          <head><title>Authorization Error</title></head>
          <body>
            <h1>Authorization Code Missing</h1>
            <p>No authorization code received from Zoho.</p>
          </body>
        </html>
      `);
    }

    const {
      ZOHO_CLIENT_ID,
      ZOHO_CLIENT_SECRET,
      ZOHO_ACCOUNTS_URL = "https://accounts.zoho.in",
    } = process.env;

    if (!ZOHO_CLIENT_ID || !ZOHO_CLIENT_SECRET) {
      return res.status(500).send(`
        <html>
          <head><title>Configuration Error</title></head>
          <body>
            <h1>Configuration Error</h1>
            <p>Zoho credentials are not configured. Please set ZOHO_CLIENT_ID and ZOHO_CLIENT_SECRET environment variables.</p>
          </body>
        </html>
      `);
    }

    // Exchange authorization code for access token and refresh token
    const tokenResponse = await fetch(
      `${ZOHO_ACCOUNTS_URL}/oauth/v2/token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          client_id: ZOHO_CLIENT_ID,
          client_secret: ZOHO_CLIENT_SECRET,
          redirect_uri: "https://www.azaleaservices.co.in/oauth/callback",
          code: code,
        }),
      }
    );

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok || tokenData.error) {
      console.error("Token exchange error:", tokenData);
      return res.status(400).send(`
        <html>
          <head><title>Token Exchange Error</title></head>
          <body>
            <h1>Failed to Exchange Token</h1>
            <p>Error: ${tokenData.error || "Unknown error"}</p>
            <p>Description: ${tokenData.error_description || "No description"}</p>
            <pre>${JSON.stringify(tokenData, null, 2)}</pre>
          </body>
        </html>
      `);
    }

    // Success - tokens received
    const { access_token, refresh_token, expires_in } = tokenData;

    // Display success page with instructions
    return res.status(200).send(`
      <html>
        <head>
          <title>Authorization Successful</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              max-width: 800px;
              margin: 50px auto;
              padding: 20px;
              background-color: #f5f5f5;
            }
            .container {
              background: white;
              padding: 30px;
              border-radius: 8px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            h1 {
              color: #187530;
            }
            .token-box {
              background: #f8f9fa;
              padding: 15px;
              border-radius: 5px;
              margin: 20px 0;
              word-break: break-all;
              font-family: monospace;
              font-size: 12px;
            }
            .warning {
              background: #fff3cd;
              border: 1px solid #ffc107;
              padding: 15px;
              border-radius: 5px;
              margin: 20px 0;
            }
            .success {
              background: #d4edda;
              border: 1px solid #28a745;
              padding: 15px;
              border-radius: 5px;
              margin: 20px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>✅ Authorization Successful!</h1>
            <div class="success">
              <p><strong>Your Zoho CRM integration is now connected!</strong></p>
              <p>Please save the refresh token below in your environment variables.</p>
            </div>
            
            <h2>Next Steps:</h2>
            <ol>
              <li>Copy the <strong>Refresh Token</strong> below</li>
              <li>Add it to your Vercel environment variables as <code>ZOHO_REFRESH_TOKEN</code></li>
              <li>The access token will be automatically refreshed when needed</li>
            </ol>

            <h3>Refresh Token (Save this securely):</h3>
            <div class="token-box">${refresh_token}</div>

            <div class="warning">
              <p><strong>⚠️ Important:</strong></p>
              <ul>
                <li>Keep this refresh token secure and private</li>
                <li>Add it to your Vercel project environment variables</li>
                <li>Do not share this token publicly</li>
                <li>Access token expires in ${expires_in} seconds (will be auto-refreshed)</li>
              </ul>
            </div>

            <p><strong>Access Token:</strong> (This will be auto-refreshed, no need to save)</p>
            <div class="token-box">${access_token}</div>

            <p style="margin-top: 30px;">
              <a href="https://www.azaleaservices.co.in" style="color: #187530; text-decoration: none;">
                ← Back to Home
              </a>
            </p>
          </div>
        </body>
      </html>
    `);
  } catch (err) {
    console.error("OAuth callback error:", err.message, err.stack);
    return res.status(500).send(`
      <html>
        <head><title>Server Error</title></head>
        <body>
          <h1>Server Error</h1>
          <p>An error occurred during authorization: ${err.message}</p>
        </body>
      </html>
    `);
  }
};

export default handler;

