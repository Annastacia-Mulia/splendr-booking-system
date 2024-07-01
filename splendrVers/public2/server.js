const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const path = require("path");

//const cors = require("cors");
// app.use(cors());

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "salonapp",
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database.");
});


// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'lisa.wanjiku@aiesec.net',
    pass: 'urqk jlyl urdr ajfy ',
  },
  tls: {
    rejectUnauthorized: false // Ignore SSL certificate errors
  }
});

// Generate verification token
const generateToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

// Serve password reset form
app.get('/reset-password', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'reset-password.html'));
});

//------------------------------------------------------------------------------------------

// API endpoint to handle user registration
app.post("/api/signup", (req, res) => {
  const { firstName, lastName, phone, gender, email, password } = req.body;
  const verificationToken = generateToken();

  // Insert into MySQL database
  const sql = "INSERT INTO users (firstName, lastName, phone, gender, email, password, verificationToken) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(sql, [firstName, lastName, phone, gender, email, password, verificationToken], (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Failed to register user" });
      return;
    }

    // Send verification email
    const mailOptions = {
      from: 'lisa.wanjiku@aiesec.net',
      to: email,
      subject: 'Email Verification - Splendr',
      text: `Please verify your email by clicking the following link: http://10.10.1.57:3000/api/verify-email?token=${verificationToken}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Failed to send verification email" });
        return;
      }

      console.log("Email sent: " + info.response);
      res.status(200).json({ message: "User registered successfully. Please check your email to verify your account." });
    });
  });
});

//------------------------------------------------------------------------------------------

// API endpoint to handle email verification
app.get("/api/verify-email", (req, res) => {
  const { token } = req.query;

  const sql = "UPDATE users SET isVerified = 1 WHERE verificationToken = ?";
  db.query(sql, [token], (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Failed to verify email" });
      return;
    }

    if (result.affectedRows === 0) {
      res.status(400).json({ error: "Invalid token or email already verified" });
      return;
    }

    res.status(200).json({ message: "Email verified successfully" });
  });
})
 //------------------------------------------------------------------------------------------

// API Endpoint for User Login
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  // Check credentials in MySQL
  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error("Error querying user:", err);
      return res.status(500).json({ message: "Login failed. Please try again." });
    }
    if (results.length > 0) {
      // Successful login
      res.status(200).json({ message: "Login successful." });
    } else {
      // Invalid credentials
      res.status(401).json({ message: "Invalid credentials." });
    }
  });
});

//--------------------------------------------------------------------------------------------


// Endpoint to request password reset
app.post('/api/request-password-reset', (req, res) => {
  const { email } = req.body;
  
  // Check if the email exists
  const sqlCheck = "SELECT * FROM users WHERE email = ?";
  db.query(sqlCheck, [email], (err, results) => {
    if (err) {
      console.error("Error checking user:", err);
      return res.status(500).json({ message: "Failed to request password reset. Please try again." });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Email not found." });
    }

    const token = generateToken();
    const sqlInsert = "UPDATE users SET resetToken = ? WHERE email = ?";
    db.query(sqlInsert, [token, email], (err, result) => {
      if (err) {
        console.error("Error updating reset token:", err);
        return res.status(500).json({ message: "Failed to request password reset. Please try again." });
      }

      // Send password reset email
      const mailOptions = {
        from: 'lisa.wanjiku@aiesec.net',
        to: email,
        subject: 'Password Reset - Splendr',
        text: `Please reset your password by clicking the following link: http://10.10.1.57:3000/reset-password?token=${token}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
          res.status(500).json({ error: "Failed to send password reset email." });
          return;
        }

        console.log("Password reset email sent: " + info.response);
        res.status(200).json({ message: "Password reset email sent successfully." });
      });
    });
  });
});


//---------------------------------------------------------------------------------------------


// Endpoint to reset password
app.post('/api/reset-password', (req, res) => {
  const { token, newPassword } = req.body;

  const sql = "UPDATE users SET password = ?, resetToken = NULL WHERE resetToken = ?";
  db.query(sql, [newPassword, token], (err, result) => {
    if (err) {
      console.error("Error resetting password:", err);
      res.status(500).json({ error: "Failed to reset password. Please try again." });
      return;
    }

    if (result.affectedRows === 0) {
      res.status(400).json({ error: "Invalid token or token has expired." });
      return;
    }

    res.status(200).json({ message: "Password reset successfully." });
  });
});



//----------------------------------------------------------------------------------------------
// Start the server
app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
  