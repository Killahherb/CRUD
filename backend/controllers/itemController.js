const Item = require('../models/itemModel');

// Get all items
exports.getItems = async (req, res) => {
  try {
    const items = await Item.getAll(); // Fetch all items
    res.status(200).json(items); // Send the items as JSON
  } catch (err) {
    console.error('Error in getItems Controller:', err.message); // Log any errors
    res.status(500).json({ error: err.message }); // Respond with an error message
  }
};

// Create a new item
exports.createItem = async (req, res) => {
  try {
    console.log('Request Body:', req.body); // Log the request payload
    const newItem = await Item.create(req.body); // Pass the request body to the model
    res.status(201).json(newItem); // Respond with the created item
  } catch (err) {
    console.error('Error in createItem:', err.message); // Log the error
    res.status(500).json({ error: err.message }); // Send a 500 response with the error
  }
};

// Update an item
exports.updateItem = async (req, res) => {
  try {
    const updatedItem = await Item.update(req.params.id, req.body);
    res.status(200).json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete an item
exports.deleteItem = async (req, res) => {
  try {
    await Item.delete(req.params.id);
    res.status(200).json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
