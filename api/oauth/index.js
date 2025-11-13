// Zoho CRM OAuth Authorization Page
// This endpoint provides a simple HTML page to start the OAuth flow

const handler = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).send("Method not allowed");
  }

  try {
    const { ZOHO_CLIENT_ID, ZOHO_ACCOUNTS_URL = "https://accounts.zoho.in" } =
      process.env;

    if (!ZOHO_CLIENT_ID) {
      return res.status(200).send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Zoho CRM Setup</title>
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
            .error {
              background: #f8d7da;
              border: 1px solid #f5c6cb;
              color: #721c24;
              padding: 15px;
              border-radius: 5px;
              margin: 20px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Zoho CRM Setup</h1>
            <div class="error">
              <strong>Error:</strong> ZOHO_CLIENT_ID is not configured in your environment variables.
              <br><br>
              Please add ZOHO_CLIENT_ID to your Vercel environment variables.
            </div>
          </div>
        </body>
        </html>
      `);
    }

    // Generate authorization URL
    const redirectUri = encodeURIComponent(
      "https://www.azaleaservices.co.in/oauth/callback"
    );
    const scope = encodeURIComponent(
      "ZohoCRM.modules.ALL,ZohoCRM.settings.ALL"
    );
    const responseType = "code";
    const accessType = "offline"; // Required to get refresh token

    const authUrl = `${ZOHO_ACCOUNTS_URL}/oauth/v2/auth?scope=${scope}&client_id=${ZOHO_CLIENT_ID}&response_type=${responseType}&access_type=${accessType}&redirect_uri=${redirectUri}`;

    return res.status(200).send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Zoho CRM Authorization</title>
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
          .info {
            background: #d1ecf1;
            border: 1px solid #bee5eb;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
          }
          .steps {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 5px;
            margin: 20px 0;
          }
          .steps ol {
            margin: 10px 0;
            padding-left: 25px;
          }
          .steps li {
            margin: 10px 0;
            line-height: 1.6;
          }
          .btn {
            display: inline-block;
            background-color: #187530;
            color: white;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
            font-weight: bold;
            margin: 20px 0;
            transition: background-color 0.3s;
          }
          .btn:hover {
            background-color: #155a24;
          }
          .url-box {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
            word-break: break-all;
            font-family: monospace;
            font-size: 12px;
            border: 1px solid #dee2e6;
          }
          .warning {
            background: #fff3cd;
            border: 1px solid #ffc107;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🔐 Zoho CRM Authorization</h1>
          
          <div class="info">
            <p><strong>Welcome!</strong> This page will help you connect your Zoho CRM account.</p>
            <p>You only need to do this once to get your refresh token.</p>
          </div>

          <div class="steps">
            <h2>Setup Steps:</h2>
            <ol>
              <li>Click the "Authorize Zoho CRM" button below</li>
              <li>Log in to your Zoho account (if not already logged in)</li>
              <li>Review and accept the permissions</li>
              <li>You'll be redirected back with a success page</li>
              <li><strong>Copy the Refresh Token</strong> from the success page</li>
              <li>Add it to your Vercel environment variables as <code>ZOHO_REFRESH_TOKEN</code></li>
            </ol>
          </div>

          <div style="text-align: center;">
            <a href="${authUrl}" class="btn">🚀 Authorize Zoho CRM</a>
          </div>

          <div class="warning">
            <p><strong>⚠️ Important Notes:</strong></p>
            <ul>
              <li>Make sure your Zoho API Console has the redirect URI set to: <code>https://www.azaleaservices.co.in/oauth/callback</code></li>
              <li>The refresh token will be shown only once - save it securely!</li>
              <li>After adding the refresh token to Vercel, redeploy your application</li>
            </ul>
          </div>

          <details style="margin-top: 30px;">
            <summary style="cursor: pointer; font-weight: bold; margin-bottom: 10px;">📋 Authorization URL (for reference)</summary>
            <div class="url-box">${authUrl}</div>
          </details>
        </div>
      </body>
      </html>
    `);
  } catch (err) {
    console.error("Authorization page error:", err.message);
    return res.status(500).send(`
      <html>
        <head><title>Error</title></head>
        <body>
          <h1>Error</h1>
          <p>An error occurred: ${err.message}</p>
        </body>
      </html>
    `);
  }
};

export default handler;

