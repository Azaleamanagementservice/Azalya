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
          .icon {
            display: inline-block;
            width: 1em;
            height: 1em;
            margin-right: 8px;
            vertical-align: middle;
          }
          .icon svg {
            width: 100%;
            height: 100%;
            fill: currentColor;
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
          <h1><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg></span> Zoho CRM Authorization</h1>
          
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
            <a href="${authUrl}" class="btn"><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path></svg></span> Authorize Zoho CRM</a>
          </div>

          <div class="warning">
            <p><strong><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg></span> Important Notes:</strong></p>
            <ul>
              <li>Make sure your Zoho API Console has the redirect URI set to: <code>https://www.azaleaservices.co.in/oauth/callback</code></li>
              <li>The refresh token will be shown only once - save it securely!</li>
              <li>After adding the refresh token to Vercel, redeploy your application</li>
            </ul>
          </div>

          <details style="margin-top: 30px;">
            <summary style="cursor: pointer; font-weight: bold; margin-bottom: 10px;"><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path></svg></span> Authorization URL (for reference)</summary>
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

