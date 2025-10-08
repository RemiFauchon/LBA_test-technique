const express = require('express');
const { getDB } = require('../config/database');

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const db = getDB();
    const products = await db.collection('products').find({}).toArray();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const db = getDB();
    const productId = parseInt(req.params.id, 10);
    const product = await db.collection('products').findOne({ _id: productId });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create product
router.post('/', async (req, res) => {
  try {
    const db = getDB();
    const {
      name, type, price, rating, warranty_years, available, // eslint-disable-line camelcase
    } = req.body;

    // Get next available ID
    const lastProduct = await db.collection('products')
      .find({})
      .sort({ _id: -1 })
      .limit(1)
      .toArray();

    const newId = lastProduct.length > 0 ? lastProduct[0]._id + 1 : 1;

    const newProduct = {
      _id: newId,
      name,
      type,
      price: parseFloat(price),
      rating: parseFloat(rating),
      warranty_years: parseInt(warranty_years, 10),
      available: Boolean(available),
    };

    await db.collection('products').insertOne(newProduct);

    // Emit socket event
    if (req.io) {
      req.io.emit('productCreated', newProduct);
    }

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update product
router.put('/:id', async (req, res) => {
  try {
    const db = getDB();
    const productId = parseInt(req.params.id, 10);
    const {
      name, type, price, rating, warranty_years, available, // eslint-disable-line camelcase
    } = req.body;

    const updatedProduct = {
      name,
      type,
      price: parseFloat(price),
      rating: parseFloat(rating),
      warranty_years: parseInt(warranty_years, 10),
      available: Boolean(available),
    };

    const result = await db.collection('products').findOneAndUpdate(
      { _id: productId },
      { $set: updatedProduct },
      { returnDocument: 'after' },
    );

    if (!result.value) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Emit socket event
    if (req.io) {
      req.io.emit('productUpdated', result.value);
    }

    res.json(result.value);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete product
router.delete('/:id', async (req, res) => {
  try {
    const db = getDB();
    const productId = parseInt(req.params.id, 10);

    const result = await db.collection('products').findOneAndDelete({ _id: productId });

    if (!result.value) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Emit socket event
    if (req.io) {
      req.io.emit('productDeleted', productId);
    }

    res.json({ message: 'Product deleted successfully', product: result.value });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
