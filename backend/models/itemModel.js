const db = require('../config/db');

// Item Model
const Item = {
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM items'); // Query to fetch all rows
    return rows; // Return the rows from the query
  },
  create: async (data) => {
    try {
      const [result] = await db.query(
        'INSERT INTO items (name, description, price) VALUES (?, ?, ?)',
        [data.name, data.description, data.price]
      );
      // Fetch and return the newly created item
      const [newItem] = await db.query('SELECT * FROM items WHERE id = ?', [
        result.insertId,
      ]);
      return newItem[0]; // Return the full item
    } catch (err) {
      console.error('Database Error in create:', err.message); // Log database errors
      throw new Error('Failed to create item in the database.'); // Throw an error if the query fails
    }
  },
  update: async (id, data) => {
    try {
      await db.query(
        'UPDATE items SET name = ?, description = ?, price = ? WHERE id = ?',
        [data.name, data.description, data.price, id]
      );
      // Fetch and return the updated item
      const [updatedItem] = await db.query('SELECT * FROM items WHERE id = ?', [
        id,
      ]);
      return updatedItem[0]; // Return the updated item
    } catch (err) {
      console.error('Database Error in update:', err.message); // Log database errors
      throw new Error('Failed to update item in the database.'); // Throw an error if the query fails
    }
  },
  delete: async (id) => {
    const [result] = await db.query('DELETE FROM items WHERE id = ?', [id]);
    return result;
  },
};

module.exports = Item;
