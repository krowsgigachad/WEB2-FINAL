const express = require('express');
const router = express.Router();
const Item = require('./Item'); // Ensure this is the correct path to your Item model

// GET all items
router.get('/item', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new item
router.post('/item', async (req, res) => {
  const item = new Item({
    pictures: req.body.pictures,
    names: req.body.names,
    descriptions: req.body.descriptions,
    // timestamps are handled by Mongoose
  });

  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update an existing item by ID
router.put('/item/:id', async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE an item by ID
router.delete('/item/:id', async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    res.json(deletedItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
