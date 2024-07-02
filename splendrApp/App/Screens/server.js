const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const path = require("path");



// const cors = require("cors");
// app.use(cors());

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

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

//------------------------------------------------------------------------------------------------------

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "lisa.wanjiku@aiesec.net",
    pass: "urqk jlyl urdr ajfy",
  },
  tls: {
    rejectUnauthorized: false, // Ignore SSL certificate errors
  },
});

// Generate verification token
const generateToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

// Serve password reset form
app.get("/reset-password", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "reset-password.html"));
});

// Serve password reset form
app.get("/verify-password", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "verify-password.html"));
});

//-----------------------------------------------------------------------------------

// API endpoint to handle user registration
app.post("/api/signup", (req, res) => {
  const { firstName, lastName, phone, gender, email, password } = req.body;
  const verificationToken = generateToken();

  // Validate input
  if (!firstName || !lastName || !phone || !gender || !email || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // Check if email already exists
  const checkEmailSql = "SELECT * FROM users WHERE email = ?";
  db.query(checkEmailSql, [email], (err, results) => {
    if (err) {
      console.error("Error checking email:", err);
      return res.status(500).json({ error: "Failed to register user" });
    }

    if (results.length > 0) {
      return res.status(409).json({ error: "Email already exists" }); // Conflict status code
    }

    // Insert into MySQL database
    const insertSql = "INSERT INTO users (firstName, lastName, phone, gender, email, password, verificationToken) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(insertSql, [firstName, lastName, phone, gender, email, password, verificationToken], (err, result) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.status(500).json({ error: "Failed to register user" });
      }

      // Send verification email
      const mailOptions = {
        from: "lisa.wanjiku@aiesec.net",
        to: email,
        subject: "Email Verification - Splendr",
        text: `Please verify your email by clicking the following link: http:/10.50.10.199:3000/api/verify-email?token=${verificationToken}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
          return res.status(500).json({ error: "Failed to send verification email" });
        }

        console.log("Email sent: " + info.response);
        res.status(200).json({ message: "User registered successfully. Please check your email to verify your account." });
      });
    });
  });
});


//-----------------------------------------------------------------------------------------------------------

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
});


//-----------------------------------------------------------------------------------------------------------


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
      const user = results[0];

      res.status(200).json({
        message: "Login successful.",
        // role: user.role // Removed role from response
      });
    } else {
      // Invalid credentials
      res.status(401).json({ message: "Invalid credentials." });
    }
  });
});

//---------------------------------------------------------------------------------------------------

// Endpoint to request password reset
app.post("/api/request-password-reset", (req, res) => {
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
        from: "lisa.wanjiku@aiesec.net",
        to: email,
        subject: "Password Reset - Splendr",
        text: `Please reset your password by clicking the following link: http://10.50.10.199:3000/reset-password?token=${token}`,
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

//--------------------------------------------------------------------------------------------------------

// Endpoint to reset password
app.post("/api/reset-password", (req, res) => {
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

//----------------------------------------------------------------------------------------

// POST endpoint to create a new appointment
app.post("/api/appointments", (req, res) => {
  const {
    client_name,
    service_name,
    appointment_date,
    appointment_time,
    business_name,
    client_email,
    beautician_name,
    extra_info
  } = req.body;

  const sql = `INSERT INTO appointments 
               (client_name, service_name, appointment_date, appointment_time, business_name, client_email, beautician_name, extra_info) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    sql,
    [
      client_name,
      service_name,
      appointment_date,
      appointment_time,
      business_name,
      client_email,
      beautician_name,
      extra_info
    ],
    (err, result) => {
      if (err) {
        console.error("Error inserting appointment:", err);
        return res.status(500).json({ error: "Failed to create appointment" });
      }

      res.status(201).json({ message: "Appointment created successfully", appointmentId: result.insertId });
    }
  );
});


//----------------------------------------------------------------------------------------------------

// API endpoint to get businesses based on service
app.get('/api/businesses', (req, res) => {
  const { service } = req.query;

// Example SQL query modification
const sql = 'SELECT business_name AS name, address, phone, email, description, image_url FROM business WHERE service = ?';
  db.query(sql, [service], (err, results) => {
    if (err) {
      console.error('Error fetching businesses:', err);
      return res.status(500).json({ error: 'Failed to fetch businesses' });
    }

    console.log('Fetched businesses:', results); // Log the fetched businesses
    res.status(200).json(results);
  });
});


//------------------------------------------------------------------------------------------------------------

// Endpoint to fetch all beauticians
app.get('/api/beauticians', (req, res) => {
  const sql = 'SELECT * FROM beauticians';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching beauticians:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.status(200).json(results);
  });
});

//--------------------------------------------------------------------------------------------------

// GET all services from the services table
app.get('/api/services', (req, res) => {
  // Adjust your SQL query based on your database schema
  const sql = 'SELECT * FROM services';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching services:', err);
      return res.status(500).json({ error: 'Failed to fetch services' });
    }

    console.log('Fetched services:', results); // Log the fetched services
    res.status(200).json(results);
  });
});


//-------------------------------------------------------------------------------------------------------------

// Endpoint to fetch available slots for a beautician
app.get('/api/available-slots', (req, res) => {
  const { beauticianId, date } = req.query;

  // Implement logic to fetch available slots from the database
  const sql = 'SELECT * FROM available_slots WHERE beautician_id = ? AND DATE(slot_datetime) = ?';
  db.query(sql, [beauticianId, date], (err, results) => {
    if (err) {
      console.error('Error fetching available slots:', err);
      return res.status(500).json({ error: 'Failed to fetch available slots' });
    }

    console.log('Fetched available slots:', results); // Log fetched slots
    res.status(200).json(results);
  });
});


//----------------------------------------------------------------------------------------------------------

// Endpoint to create a new appointment
app.post('/api/book-appointment', (req, res) => {
  const { beauticianId, clientName, serviceId, appointmentDate, appointmentTime } = req.body;

  // Implement logic to create an appointment in the database
  const sql = `INSERT INTO appointments (beautician_id, client_name, service_id, appointment_date, appointment_time)
               VALUES (?, ?, ?, ?, ?)`;
  db.query(sql, [beauticianId, clientName, serviceId, appointmentDate, appointmentTime], (err, result) => {
    if (err) {
      console.error('Error booking appointment:', err);
      return res.status(500).json({ error: 'Failed to book appointment' });
    }

    res.status(201).json({ message: 'Appointment booked successfully', appointmentId: result.insertId });
  });
});

//----------------------------------------------------------------------------------------------------------

// Endpoint to fetch appointments for a client
app.get('/api/appointments', (req, res) => {
  const { clientEmail } = req.query;

  // Implement logic to fetch appointments from the database
  const sql = 'SELECT * FROM appointments WHERE client_email = ?';
  db.query(sql, [clientEmail], (err, results) => {
    if (err) {
      console.error('Error fetching appointments:', err);
      return res.status(500).json({ error: 'Failed to fetch appointments' });
    }

    console.log('Fetched appointments:', results); // Log fetched appointments
    res.status(200).json(results);
  });
});


//----------------------------------------------------------------------------------------------------------------


// API endpoint to fetch user details by email
app.get('/api/user-details', async (req, res) => {
  const { email } = req.query;

  try {
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], (err, results) => {
      if (err) {
        console.error('Error fetching user details:', err);
        return res.status(500).json({ error: 'Failed to fetch user details' });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      const userDetails = results[0]; // Assuming there's only one user with the given email

      // Return user details
      res.status(200).json(userDetails);
    });
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

//-----------------------------------------------------------------------------------------------------

// Start the server


app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});

