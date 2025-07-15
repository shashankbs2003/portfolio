// ✅ Required modules
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const XLSX = require("xlsx");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

// ✅ Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Excel file path
const filePath = "contact_data_.xlsx";

// ✅ Route to handle contact form submission
app.post("/submit", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  console.log("📩 Received:", name, email, message);

  let workbook, worksheet;

  // Load or create Excel workbook
  if (fs.existsSync(filePath)) {
    workbook = XLSX.readFile(filePath);
    worksheet = workbook.Sheets[workbook.SheetNames[0]];
  } else {
    workbook = XLSX.utils.book_new();
    worksheet = XLSX.utils.aoa_to_sheet([["Name", "Email", "Message"]]);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Contacts");
  }

  // Convert sheet to array and append new row
  let data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

  if (data.length === 0 || data[0][0] !== "Name") {
    data = [["Name", "Email", "Message"]];
  }

  data.push([name, email, message]);

  const updatedSheet = XLSX.utils.aoa_to_sheet(data);
  workbook.Sheets[workbook.SheetNames[0]] = updatedSheet;
  XLSX.writeFile(workbook, filePath);

  res.json({ message: "✅ Data saved to Excel!" });
});

// ✅ Route to download Excel file
app.get("/download-excel", (req, res) => {
  if (fs.existsSync(filePath)) {
    res.download(filePath, "contact_data_.xlsx", (err) => {
      if (err) {
        res.status(500).send("❌ Error downloading file.");
      }
    });
  } else {
    res.status(404).send("❌ Excel file not found.");
  }
});

// ✅ Start the server
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
