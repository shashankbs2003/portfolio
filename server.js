// ✅ server.js
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const XLSX = require("xlsx");
const cors = require("cors"); 


const app = express();
const port = 3000;
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const filePath = "contact_data_.xlsx";

app.post("/submit", (req, res) => {
  const { name, email, message } = req.body;

  console.log("Received:", name, email, message); // ✅ Log incoming data

  let workbook;
  let worksheet;

  if (fs.existsSync(filePath)) {
    workbook = XLSX.readFile(filePath);
    worksheet = workbook.Sheets[workbook.SheetNames[0]];
  } else {
    workbook = XLSX.utils.book_new();
    worksheet = XLSX.utils.aoa_to_sheet([["Name", "Email", "Message"]]);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Contacts");
  }

  let data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

  // Ensure headers exist
  if (data.length === 0 || data[0][0] !== "Name") {
    data = [["Name", "Email", "Message"]];
  }

  data.push([name, email, message]);

  const newSheet = XLSX.utils.aoa_to_sheet(data);
  workbook.Sheets[workbook.SheetNames[0]] = newSheet;
  XLSX.writeFile(workbook, filePath);

  res.json({ message: "✅ Data saved to Excel!" });
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});

// ✅ server.js
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const XLSX = require("xlsx");
const cors = require("cors"); 


const app = express();
const port = 3000;
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const filePath = "contact_data_.xlsx";

app.post("/submit", (req, res) => {
  const { name, email, message } = req.body;

  console.log("Received:", name, email, message); // ✅ Log incoming data

  let workbook;
  let worksheet;

  if (fs.existsSync(filePath)) {
    workbook = XLSX.readFile(filePath);
    worksheet = workbook.Sheets[workbook.SheetNames[0]];
  } else {
    workbook = XLSX.utils.book_new();
    worksheet = XLSX.utils.aoa_to_sheet([["Name", "Email", "Message"]]);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Contacts");
  }

  let data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

  // Ensure headers exist
  if (data.length === 0 || data[0][0] !== "Name") {
    data = [["Name", "Email", "Message"]];
  }

  data.push([name, email, message]);

  const newSheet = XLSX.utils.aoa_to_sheet(data);
  workbook.Sheets[workbook.SheetNames[0]] = newSheet;
  XLSX.writeFile(workbook, filePath);

  res.json({ message: "✅ Data saved to Excel!" });
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});