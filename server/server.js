require("dotenv").config();

const express = require("express");
const cors = require("cors");

const {
  router: authRoutes
} = require("./routes/auth");

const recordRoutes =
  require("./routes/records");

const app = express();

app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json());

app.use("/auth", authRoutes);

app.use("/api/records", recordRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Salesforce CRUD API running"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});
