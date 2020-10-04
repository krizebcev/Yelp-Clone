require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/restaurants", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating),1) " +
        "AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id ORDER BY restaurants.id"
    );

    res.status(200).json({
      status: "success",
      results: result.rows.length,
      data: {
        restaurants: result.rows,
      },
    });
  } catch (err) {
    console.log(err.stack);
  }
});

app.get("/api/restaurants/:id", async (req, res) => {
  try {
    const restaurant = db.query(
      "SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating),1) " +
        "AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id WHERE restaurants.id = $1",
      [req.params.id]
    );
    const reviews = db.query("SELECT * FROM reviews WHERE restaurant_id = $1", [
      req.params.id,
    ]);

    const result = await Promise.all([restaurant, reviews]);

    if (result[0].rowCount > 0) {
      res.status(200).json({
        status: "success",
        data: {
          restaurant: result[0].rows[0],
          reviews: result[1].rows,
        },
      });
    } else {
      res.status(404).json({
        status: "fail",
        message: `Restaurant with ID of ${req.params.id} does not exist.`,
      });
    }
  } catch (err) {
    console.log(err.stack);
  }
});

app.post("/api/restaurants", async (req, res) => {
  try {
    const result = await db.query(
      "INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *",
      [req.body.name, req.body.location, req.body.price_range]
    );

    res.status(201).json({
      status: "success",
      data: {
        restaurant: result.rows[0],
      },
    });
  } catch (err) {
    console.log(err.stack);
  }
});

app.put("/api/restaurants/:id", async (req, res) => {
  try {
    const result = await db.query(
      "UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *",
      [req.body.name, req.body.location, req.body.price_range, req.params.id]
    );

    if (result.rowCount == 1) {
      res.status(200).json({
        status: "success",
        data: {
          restaurant: result.rows[0],
        },
      });
    } else {
      res.status(404).json({
        status: "fail",
        message: `Restaurant with ID of ${req.params.id} does not exist.`,
      });
    }
  } catch (err) {
    console.log(err.stack);
  }
});

app.delete("/api/restaurants/:id", async (req, res) => {
  try {
    const result = await db.query("DELETE FROM restaurants WHERE id = $1", [
      req.params.id,
    ]);

    if (result.rowCount == 1) {
      res.status(200).json({
        status: "success",
      });
    } else {
      res.status(404).json({
        status: "fail",
        message: `Restaurant with ID of ${req.params.id} does not exist.`,
      });
    }
  } catch (err) {
    console.log(err.stack);
  }
});

app.post("/api/restaurants/:id/addReview", async (req, res) => {
  try {
    const result = await db.query(
      "INSERT INTO reviews (restaurant_id, name, review, rating) VALUES ($1, $2, $3, $4) RETURNING *",
      [req.params.id, req.body.name, req.body.review, req.body.rating]
    );

    res.status(201).json({
      status: "success",
      data: {
        review: result.rows[0],
      },
    });
  } catch (err) {
    console.log(err.stack);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
