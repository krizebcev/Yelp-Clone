require("dotenv").config();
const express = require("express");
const db = require("./db");
const app = express();

app.use(express.json());

app.get("/api/restaurants", async (req, res) => {
  const result = await db.query("select * from restaurants");

  console.log(result.rows);
  res.status(200).json({
    status: "success",
    data: {
      restaurants: [],
    },
  });
});

app.get("/api/restaurants/:id", (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      restaurant: {},
    },
  });
});

app.post("/api/restaurants", (req, res) => {
  res.status(201).json({
    status: "success",
    data: {
      restaurant: {},
    },
  });
});

app.put("/api/restaurants/:id", (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      restaurant: {},
    },
  });
});

app.delete("/api/restaurants/:id", (req, res) => {
  res.status(204).json({
    status: "success",
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
