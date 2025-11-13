import mongoose from "mongoose";
import nodemailer from "nodemailer";
import Joi from "joi";

// -------------------------
// ENV VARIABLES
// -------------------------
const {
  MONGODB_URI,
  SMTP_MAIL,
  SMTP_PASS,
  SMTP_PORT,
  SECURE,
  SMTP_HOST,
  ZOHO_CLIENT_ID,
  ZOHO_CLIENT_SECRET,
  ZOHO_REFRESH_TOKEN,
  ZOHO_ACCOUNTS_URL = "https://accounts.zoho.in",
  ZOHO_CRM_API_URL = "https://www.zohoapis.in",
} = process.env;

// Validate required environment variables
if (!MONGODB_URI || !SMTP_MAIL || !SMTP_PASS) {
  throw new Error(
    "Missing required environment variables: MONGODB_URI, SMTP_MAIL, SMTP_PASS"
  );
}

// -------------------------
// MONGOOSE DB CONNECT
// -------------------------
let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };

async function dbConnect(retries = 3, delay = 1000) {
  if (cached.conn) return cached.conn;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      if (!cached.promise) {
        cached.promise = mongoose
          .connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            bufferCommands: false,
            serverSelectionTimeoutMS: 5000,
          })
          .then((mongoose) => mongoose);
      }
      cached.conn = await cached.promise;
      console.log("MongoDB connected successfully");
      return cached.conn;
    } catch (error) {
      console.error(
        `MongoDB connection attempt ${attempt} failed:`,
        error.message
      );
      if (attempt === retries)
        throw new Error(
          `MongoDB connection failed after ${retries} attempts: ${error.message}`
        );
      await new Promise((resolve) => setTimeout(resolve, delay * attempt));
    }
  }
}

// -------------------------
// CONTACT SCHEMA
// -------------------------
const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    number: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: true }
);

const Contact =
  mongoose.models.azaleaContact ||
  mongoose.model("azaleaContact", contactSchema);

// -------------------------
// VALIDATION SCHEMA
// -------------------------
const contactValidationSchema = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    "string.base": "* Name must be a string",
    "string.min": "* Name must be at least 2 characters long",
    "string.max": "* Name must not exceed 50 characters",
    "any.required": "* Name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.base": "* Email must be a string",
    "string.email": "* Email must be a valid email address",
    "any.required": "* Email is required",
  }),
  number: Joi.string()
    .pattern(/^\+?[\d\s-]{8,15}$/)
    .required()
    .messages({
      "string.base": "* Phone Number must be a string",
      "string.pattern.base":
        "* Phone Number must be a valid format (8-15 digits, optional spaces, hyphens, or +)",
      "any.required": "* Phone Number is required",
    }),
  message: Joi.string().max(500).allow("").optional().messages({
    "string.base": "* Message must be a string",
    "string.max": "* Message must not exceed 500 characters",
  }),
});

// -------------------------
// EMAIL TEMPLATES
// -------------------------
const firmTemplate = (userInfo) => {
  try {
    let { name, email, message, number } = userInfo;
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Azalea Contact Form</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f9fa;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
    <tr>
      <td style="padding: 30px; text-align: center; background-color: #187530; color: #ffffff; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0; font-size: 28px; font-weight: 300; letter-spacing: 2px;">AZALEA</h1>
        <p style="margin: 10px 0 0; font-size: 14px; opacity: 0.9;">New Contact Inquiry</p>
      </td>
    </tr>
    <tr>
      <td style="padding: 30px; color: #333333;">
        <h2 style="font-size: 22px; color: #187530; margin: 0 0 20px; font-weight: 600;">New Contact Form Submission</h2>
        <p style="font-size: 16px; line-height: 1.6; margin: 0 0 25px; color: #666;">
          You have received a new contact inquiry through the Azalea website. Please find the details below:
        </p>
        
        <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="12" style="border-collapse: collapse;">
            <tr>
              <td style="font-weight: 600; color: #187530; width: 30%; padding: 12px 0; border-bottom: 1px solid #e9ecef;">Name:</td>
              <td style="color: #333; padding: 12px 0; border-bottom: 1px solid #e9ecef;">${name}</td>
            </tr>
            <tr>
              <td style="font-weight: 600; color: #187530; width: 30%; padding: 12px 0; border-bottom: 1px solid #e9ecef;">Email:</td>
              <td style="color: #333; padding: 12px 0; border-bottom: 1px solid #e9ecef;"><a href="mailto:${email}" style="color: #187530; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="font-weight: 600; color: #187530; width: 30%; padding: 12px 0; ${
                message ? "border-bottom: 1px solid #e9ecef;" : ""
              }">Phone:</td>
              <td style="color: #333; padding: 12px 0; ${
                message ? "border-bottom: 1px solid #e9ecef;" : ""
              }"><a href="tel:${number}" style="color: #187530; text-decoration: none;">${number}</a></td>
            </tr>
            ${
              message
                ? `
            <tr>
              <td style="font-weight: 600; color: #187530; width: 30%; padding: 12px 0; vertical-align: top;">Message:</td>
              <td style="color: #333; padding: 12px 0; line-height: 1.6;">${message}</td>
            </tr>
            `
                : ""
            }
          </table>
        </div>
        
        <div style="background-color: #187530; border-radius: 6px; padding: 20px; margin: 25px 0; text-align: center;">
          <p style="color: #fff; margin: 0; font-size: 14px;">
            <strong>Action Required:</strong> Please respond to this inquiry within 24 hours
          </p>
        </div>
        
        <p style="font-size: 14px; line-height: 1.6; margin: 25px 0 0; color: #666;">
          Best regards,<br>
          <strong style="color: #187530;">Azalea Contact System</strong>
        </p>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px; text-align: center; background-color: #f8f9fa; color: #666; font-size: 12px; border-radius: 0 0 8px 8px;">
        <p style="margin: 0;">© ${new Date().getFullYear()} Azalea. All rights reserved.</p>
        <p style="margin: 5px 0 0;">This email was automatically generated from your contact form.</p>
      </td>
    </tr>
  </table>
</body>
</html>`;
  } catch (error) {
    console.error("Error in firmTemplate:", error);
    throw error;
  }
};

const userTemplate = (userInfo) => {
  try {
    let { name } = userInfo;
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You - Azalea</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f9fa;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
    <tr>
      <td style="padding: 30px; text-align: center; background-color: #187530; color: #ffffff; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0; font-size: 28px; font-weight: 300; letter-spacing: 2px;">AZALEA</h1>
        <p style="margin: 10px 0 0; font-size: 14px; opacity: 0.9;">Thank You For Reaching Out</p>
      </td>
    </tr>
    <tr>
      <td style="padding: 30px; color: #333333;">
        <h2 style="font-size: 22px; color: #187530; margin: 0 0 20px; font-weight: 600;">Hello ${name}!</h2>
        
        <p style="font-size: 16px; line-height: 1.6; margin: 0 0 20px; color: #666;">
          Thank you for contacting <strong style="color: #187530;">Azalea</strong>. We have successfully received your inquiry and appreciate you taking the time to reach out to us.
        </p>
        
        <div style="background-color: #187530; border-radius: 8px; padding: 25px; margin: 25px 0; text-align: center;">
          <h3 style="color: #fff; margin: 0 0 10px; font-size: 18px; font-weight: 600;">What Happens Next?</h3>
          <p style="color: #fff; margin: 0; font-size: 14px; opacity: 0.9;">
            Our team will review your message and get back to you within 24-48 hours with a personalized response.
          </p>
        </div>
        
        <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin: 25px 0;">
          <h4 style="color: #187530; margin: 0 0 15px; font-size: 16px;">In the meantime, you can:</h4>
          <ul style="color: #666; margin: 0; padding-left: 20px; line-height: 1.8;">
            <li>Follow us on social media for updates</li>
            <li>Browse our website for more information</li>
            <li>Check out our latest news and announcements</li>
          </ul>
        </div>
        
        <p style="font-size: 16px; line-height: 1.6; margin: 25px 0 0; color: #666;">
          If you have any urgent questions, please don't hesitate to contact us directly.
        </p>
        
        <p style="font-size: 14px; line-height: 1.6; margin: 25px 0 0; color: #666;">
          Warm regards,<br>
          <strong style="color: #187530;">The Azalea Team</strong>
        </p>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px; text-align: center; background-color: #f8f9fa; color: #666; font-size: 12px; border-radius: 0 0 8px 8px;">
        <p style="margin: 0;">© ${new Date().getFullYear()} Azalea. All rights reserved.</p>
        <p style="margin: 5px 0 0;">This is an automated response to confirm receipt of your message.</p>
      </td>
    </tr>
  </table>
</body>
</html>`;
  } catch (error) {
    console.error("Error in userTemplate:", error);
    throw error;
  }
};

// -------------------------
// EMAIL SENDER
// -------------------------
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465, // or 587
  secure: true, // true for 465, false for 587
  auth: {
    user: process.env.SMTP_MAIL, // e.g. info@yourdomain.com
    pass: process.env.SMTP_PASS, // App password
  },
});

// Verify transporter configuration at startup
transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP configuration error at startup:", error);
  } else {
    console.log("SMTP server is ready to take messages");
  }
});

async function sendMailWithRetry(from, to, subject, html, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const result = await transporter.sendMail({ from, to, subject, html });
      console.log(`Email sent successfully: ${result.messageId}`);
      return result;
    } catch (error) {
      console.error(`Email attempt ${attempt} failed:`, error.message);
      if (attempt === retries)
        throw new Error(
          `Email sending failed after ${retries} attempts: ${error.message}`
        );
      await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
    }
  }
}

// -------------------------
// ZOHO CRM INTEGRATION
// -------------------------

// Cache for access token to avoid unnecessary refresh calls
let cachedAccessToken = {
  token: null,
  expiresAt: null,
};

/**
 * Refresh Zoho CRM access token using refresh token
 */
async function refreshZohoAccessToken() {
  try {
    if (!ZOHO_CLIENT_ID || !ZOHO_CLIENT_SECRET || !ZOHO_REFRESH_TOKEN) {
      console.warn(
        "Zoho CRM credentials not configured. Skipping Zoho CRM integration."
      );
      return null;
    }

    const response = await fetch(`${ZOHO_ACCOUNTS_URL}/oauth/v2/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        client_id: ZOHO_CLIENT_ID,
        client_secret: ZOHO_CLIENT_SECRET,
        refresh_token: ZOHO_REFRESH_TOKEN,
      }),
    });

    const data = await response.json();

    if (!response.ok || data.error) {
      console.error("Failed to refresh Zoho access token:", data);
      return null;
    }

    // Cache the token with expiration time (subtract 60 seconds for safety)
    cachedAccessToken.token = data.access_token;
    cachedAccessToken.expiresAt =
      Date.now() + (data.expires_in - 60) * 1000;

    console.log("Zoho access token refreshed successfully");
    return data.access_token;
  } catch (error) {
    console.error("Error refreshing Zoho access token:", error.message);
    return null;
  }
}

/**
 * Get valid Zoho CRM access token (refresh if needed)
 */
async function getZohoAccessToken() {
  // Check if cached token is still valid
  if (
    cachedAccessToken.token &&
    cachedAccessToken.expiresAt &&
    Date.now() < cachedAccessToken.expiresAt
  ) {
    return cachedAccessToken.token;
  }

  // Refresh token
  return await refreshZohoAccessToken();
}

/**
 * Create a contact/lead in Zoho CRM
 */
async function createZohoContact(contactData) {
  try {
    const { name, email, number, message } = contactData;

    // Get valid access token
    const accessToken = await getZohoAccessToken();

    if (!accessToken) {
      console.warn("No Zoho access token available. Skipping CRM integration.");
      return { success: false, error: "No access token" };
    }

    // Prepare lead data for Zoho CRM
    // Split name into First Name and Last Name if possible
    const nameParts = name.trim().split(/\s+/);
    const firstName = nameParts.length > 1 ? nameParts[0] : name;
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

    const zohoLeadData = {
      data: [
        {
          First_Name: firstName,
          Last_Name: lastName || firstName, // Use first name as last name if only one name provided
          Email: email,
          Phone: number,
          Description: message || "Contact form submission from Azalea website",
          Lead_Source: "Website",
          Lead_Status: "Not Contacted",
        },
      ],
    };

    // Create lead in Zoho CRM
    console.log("📤 Creating lead in Zoho CRM for:", email);
    const response = await fetch(
      `${ZOHO_CRM_API_URL}/crm/v3/Leads`,
      {
        method: "POST",
        headers: {
          Authorization: `Zoho-oauthtoken ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(zohoLeadData),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      // If token expired, try refreshing once more
      if (response.status === 401) {
        console.log("Token expired, refreshing...");
        const newToken = await refreshZohoAccessToken();
        if (newToken) {
          // Retry with new token
          const retryResponse = await fetch(
            `${ZOHO_CRM_API_URL}/crm/v3/Leads`,
            {
              method: "POST",
              headers: {
                Authorization: `Zoho-oauthtoken ${newToken}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(zohoLeadData),
            }
          );
          const retryResult = await retryResponse.json();
          if (retryResponse.ok) {
            console.log("Contact created in Zoho CRM successfully");
            return { success: true, data: retryResult };
          }
        }
      }

      console.error("Failed to create contact in Zoho CRM:", result);
      return { success: false, error: result.message || "Unknown error" };
    }

    console.log("Contact created in Zoho CRM successfully");
    return { success: true, data: result };
  } catch (error) {
    console.error("Error creating Zoho contact:", error.message);
    return { success: false, error: error.message };
  }
}

// -------------------------
// API HANDLER
// -------------------------
const handler = async (req, res) => {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ isSuccess: false, message: "Method not allowed" });
  }

  try {
    await dbConnect();
    let { name, email, number, message = "" } = req.body;

    // Validate input
    const { error } = contactValidationSchema.validate({
      name,
      email,
      number,
      message,
    });

    if (error) {
      console.log("Validation error:", error.details[0].message);
      return res.status(400).json({
        isSuccess: false,
        message: "Validation Error",
        error: error.details[0].message,
      });
    }

    // Check if SMTP credentials are available
    if (!SMTP_MAIL || !SMTP_PASS) {
      console.error("SMTP credentials missing during request");
      return res.status(500).json({
        isSuccess: false,
        message: "Email configuration error",
      });
    }

    // Save contact to database
    const newContact = new Contact({
      name,
      email,
      number,
      message,
    });

    await newContact.save();
    console.log("Contact saved to database:", email);

    // Create lead in Zoho CRM (with timeout to not block response)
    let zohoStatus = "pending";
    let zohoError = null;
    
    // Try to sync to Zoho CRM, but don't block the response
    const zohoPromise = createZohoContact({ name, email, number, message })
      .then((result) => {
        if (result.success) {
          zohoStatus = "success";
          console.log("✅ Lead created in Zoho CRM successfully:", email);
          if (result.data && result.data.data && result.data.data[0]) {
            console.log("Zoho Lead ID:", result.data.data[0].id);
          }
        } else {
          zohoStatus = "failed";
          zohoError = result.error;
          console.warn("❌ Failed to create lead in Zoho CRM:", result.error);
        }
      })
      .catch((error) => {
        zohoStatus = "failed";
        zohoError = error.message;
        console.error("❌ Zoho CRM sync error:", error.message);
      });

    // Wait for Zoho sync with a timeout (max 5 seconds)
    // This ensures we try to sync but don't delay the response too much
    Promise.race([
      zohoPromise,
      new Promise((resolve) => setTimeout(() => {
        if (zohoStatus === "pending") {
          zohoStatus = "timeout";
          console.warn("⏱️ Zoho CRM sync timed out (still processing in background)");
        }
        resolve();
      }, 5000))
    ]).catch(() => {});

    // Send emails with timeout handling
    let emailStatus = "pending";
    try {
      console.log("Attempting to send emails for:", email);
      const emailPromises = [
        sendMailWithRetry(
          SMTP_MAIL,
          email,
          "Thank You For Contacting Azalea",
          userTemplate({ name })
        ),
        sendMailWithRetry(
          SMTP_MAIL,
          SMTP_MAIL,
          "New Contact Form Submission - Azalea",
          firmTemplate({ name, email, number, message })
        ),
      ];

      // Wait for emails to send with 8-second timeout
      await Promise.race([
        Promise.all(emailPromises),
        new Promise((_, reject) =>
          setTimeout(
            () => reject(new Error("Email sending timed out after 8 seconds")),
            8000
          )
        ),
      ]);

      emailStatus = "sent";
      console.log("Emails sent successfully for:", email);
    } catch (emailError) {
      console.error("Email sending failed for:", email, emailError.message);
      emailStatus = "failed";
    }

    // Send response based on email status
    const responseData = {
      isSuccess: true,
      message: emailStatus === "sent" 
        ? "Contact submitted successfully and confirmation emails sent"
        : "Contact submitted successfully, but email delivery failed",
      data: {
        name,
        email,
        number,
        message: message || null,
        submittedAt: new Date().toISOString(),
      },
      emailStatus: emailStatus,
      zohoCrmStatus: zohoStatus, // Include Zoho CRM sync status
    };

    // Add Zoho error if failed
    if (zohoStatus === "failed" && zohoError) {
      responseData.zohoCrmError = zohoError;
    }

    res.status(201).json(responseData);
  } catch (err) {
    console.error("Contact API error:", err.message, err.stack);
    res.status(500).json({
      isSuccess: false,
      message: "Internal Server Error",
      error: err?.message || undefined,
    });
  }
};

export default handler;
