const express = require("express");
const app = express();
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const port = 3000;
const db = new sqlite3.Database('accommodations.db'); 

app.use(cors());

app.get("/api/accomodations", (req, res) => {
  db.all(
    "SELECT id, image, city_zipCode, city_name, price, rating, favourite FROM accommodations",
    (err, rows) => {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal server error" });
      } else {
        const accommodations = rows.map((row) => ({
          id: row.id,
          image: row.image,
          city: {
            zipCode: row.city_zipCode,
            name: row.city_name,
          },
          price: row.price,
          rating: row.rating,
          favourite: !!row.favourite,
        }));
        res.json(accommodations);
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Serveur écoutant sur le port ${port}`);
});
