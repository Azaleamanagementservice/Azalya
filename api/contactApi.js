import mongoose from "mongoose";
import nodemailer from "nodemailer";
import Joi from "joi";

// -------------------------
// ENV VARIABLES
// -------------------------
const { MONGODB_URI, SMTP_MAIL, SMTP_PASS } = process.env;

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
      console.error(`MongoDB connection attempt ${attempt} failed:`, error.message);
      if (attempt === retries)
        throw new Error(`MongoDB connection failed after ${retries} attempts: ${error.message}`);
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
              <td style="font-weight: 600; color: #187530; width: 30%; padding: 12px 0; ${message ? 'border-bottom: 1px solid #e9ecef;' : ''}">Phone:</td>
              <td style="color: #333; padding: 12px 0; ${message ? 'border-bottom: 1px solid #e9ecef;' : ''}"><a href="tel:${number}" style="color: #187530; text-decoration: none;">${number}</a></td>
            </tr>
            ${message ? `
            <tr>
              <td style="font-weight: 600; color: #187530; width: 30%; padding: 12px 0; vertical-align: top;">Message:</td>
              <td style="color: #333; padding: 12px 0; line-height: 1.6;">${message}</td>
            </tr>
            ` : ''}
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
  service: "gmail",
  auth: {
    user: SMTP_MAIL,
    pass: SMTP_PASS,
  },
  pool: true,
  maxConnections: 1,
  rateDelta: 20000,
  rateLimit: 10,
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
// API HANDLER
// -------------------------
const handler = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
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
    if (emailStatus === "sent") {
      res.status(201).json({
        isSuccess: true,
        message: "Contact submitted successfully and confirmation emails sent",
        data: {
          name,
          email,
          number,
          message: message || null,
          submittedAt: new Date().toISOString()
        }
      });
    } else {
      res.status(201).json({
        isSuccess: true,
        message: "Contact submitted successfully, but email delivery failed",
        emailStatus: emailStatus,
        data: {
          name,
          email,
          number,
          message: message || null,
          submittedAt: new Date().toISOString()
        }
      });
    }
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
