const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("accommodations.db");
const fs = require("fs");

const accommodations = [
  {
    id: 1,
    city: {
      zipCode: 44000,
      name: "Nantes",
    },
    price: 120,
    rating: 4.5,
    favourite: false,
  },
  {
    id: 2,
    city: {
      zipCode: 69000,
      name: "Lyon",
    },
    price: 150,
    rating: 4.2,
    favourite: true,
  },
  {
    id: 3,
    city: {
      zipCode: 75000,
      name: "Paris",
    },
    price: 200,
    rating: 4.8,
    favourite: false,
  },
  {
    id: 4,
    city: {
      zipCode: 13000,
      name: "Marseille",
    },
    price: 90,
    rating: 4.0,
    favourite: true,
  },
  {
    id: 5,
    city: {
      zipCode: 33000,
      name: "Bordeaux",
    },
    price: 110,
    rating: 4.7,
    favourite: false,
  },
  {
    id: 6,
    city: {
      zipCode: 69000,
      name: "Lyon",
    },
    price: 180,
    rating: 4.6,
    favourite: true,
  },
  {
    id: 7,
    city: {
      zipCode: 44000,
      name: "Nantes",
    },
    price: 130,
    rating: 4.4,
    favourite: false,
  },
  {
    id: 8,
    city: {
      zipCode: 21000,
      name: "Dijon",
    },
    price: 95,
    rating: 4.1,
    favourite: true,
  },
  {
    id: 9,
    city: {
      zipCode: 33000,
      name: "Bordeaux",
    },
    price: 105,
    rating: 4.3,
    favourite: false,
  },
  {
    id: 10,
    city: {
      zipCode: 75000,
      name: "Paris",
    },
    price: 220,
    rating: 4.9,
    favourite: true,
  },
  {
    id: 11,
    city: {
      zipCode: 54000,
      name: "Nancy",
    },
    price: 80,
    rating: 3.8,
    favourite: false,
  },
  {
    id: 12,
    city: {
      zipCode: 13000,
      name: "Marseille",
    },
    price: 100,
    rating: 4.0,
    favourite: true,
  },
  {
    id: 13,
    city: {
      zipCode: 44000,
      name: "Nantes",
    },
    price: 140,
    rating: 4.6,
    favourite: false,
  },
  {
    id: 14,
    city: {
      zipCode: 21000,
      name: "Dijon",
    },
    price: 110,
    rating: 4.2,
    favourite: true,
  },
  {
    id: 15,
    city: {
      zipCode: 67000,
      name: "Strasbourg",
    },
    price: 125,
    rating: 4.3,
    favourite: false,
  },
];

/**
 * Fonction pour lire et encoder une image en Base64
 */
function encodeImageToBase64(imagePath) {
  const imageBuffer = fs.readFileSync(imagePath);
  return imageBuffer.toString("base64");
}

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS accommodations (
    id INTEGER PRIMARY KEY,
    image TEXT,
    city_zipCode INTEGER,
    city_name TEXT,
    price REAL,
    rating REAL,
    favourite INTEGER
  )`);

  const stmt = db.prepare(`
    INSERT INTO accommodations (id, image, city_zipCode, city_name, price, rating, favourite)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  accommodations.forEach(({ id, city, price, rating, favourite }) => {
    const imagePath = `data/img/${id}.jpg`;
    const imageBase64 = encodeImageToBase64(imagePath);

    stmt.run(
      id,
      imageBase64,
      city.zipCode,
      city.name,
      price,
      rating,
      favourite ? 1 : 0
    );
  });

  stmt.finalize();
});

db.close();
