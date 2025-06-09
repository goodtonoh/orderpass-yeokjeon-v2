const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());

app.use(express.static(path.join(__dirname, "public")));

// React 정적 파일
app.use(express.static(path.join(__dirname, "../frontend/build")));

// React Router 
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

// Run the Server 
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

