const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Initialize SQLite database
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the database.');
});

// Create products table if it doesn't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      image TEXT,
      description TEXT,
      price REAL NOT NULL
    )
  `);

  // Insert some sample data
  const insert = 'INSERT INTO products (name, image, description, price) VALUES (?,?,?,?)';
  db.get("SELECT COUNT(*) AS count FROM products", (err, row) => {
    if (row.count == 0) {
      db.run(insert, ['Product 1', 'https://via.placeholder.com/150', 'Description for Product 1', 20.00]);
      db.run(insert, ['Product 2', 'https://via.placeholder.com/150', 'Description for Product 2', 30.00]);
      db.run(insert, ['Product 3', 'https://via.placeholder.com/150', 'Description for Product 3', 40.00]);
      db.run(insert, ['Product 4', 'https://via.placeholder.com/150', 'Description for Product 4', 25.00]);
      db.run(insert, ['Product 5', 'https://via.placeholder.com/150', 'Description for Product 5', 35.00]);
    }
  });
});

// API endpoint to get all products
app.get('/api/products', (req, res) => {
  db.all('SELECT * FROM products', [], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
