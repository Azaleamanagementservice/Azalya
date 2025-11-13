// Zoho CRM OAuth Authorization URL Generator
// This endpoint provides the authorization URL to start the OAuth flow

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
    const { ZOHO_CLIENT_ID, ZOHO_ACCOUNTS_URL = "https://accounts.zoho.in" } =
      process.env;

    if (!ZOHO_CLIENT_ID) {
      return res.status(500).json({
        success: false,
        message: "ZOHO_CLIENT_ID not configured",
      });
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

    return res.status(200).json({
      success: true,
      authorizationUrl: authUrl,
      instructions: [
        "1. Click the authorizationUrl above or copy it to your browser",
        "2. Authorize the application in Zoho",
        "3. You will be redirected to the callback URL",
        "4. Copy the refresh token from the success page",
        "5. Add it to your Vercel environment variables as ZOHO_REFRESH_TOKEN",
      ],
    });
  } catch (err) {
    console.error("Authorization URL generation error:", err.message);
    return res.status(500).json({
      success: false,
      message: "Error generating authorization URL",
      error: err.message,
    });
  }
};

export default handler;

