import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  Grid,
} from '@mui/material';

function ProductForm({
  open, onClose, onSubmit, product,
}) {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    price: '',
    rating: '',
    warranty_years: '',
    available: true,
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        type: product.type || '',
        price: product.price || '',
        rating: product.rating || '',
        warranty_years: product.warranty_years || '',
        available: product.available !== undefined ? product.available : true,
      });
    } else {
      setFormData({
        name: '',
        type: '',
        price: '',
        rating: '',
        warranty_years: '',
        available: true,
      });
    }
  }, [product, open]);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'available' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{product ? 'Edit Product' : 'Add New Product'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Price"
                name="price"
                type="number"
                inputProps={{ step: '0.01', min: '0' }}
                value={formData.price}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Rating"
                name="rating"
                type="number"
                inputProps={{ step: '0.1', min: '0', max: '5' }}
                value={formData.rating}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Warranty (years)"
                name="warranty_years"
                type="number"
                inputProps={{ min: '0' }}
                value={formData.warranty_years}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={(
                  <Switch
                    checked={formData.available}
                    onChange={handleChange}
                    name="available"
                  />
                )}
                label="Available"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            {product ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default ProductForm;
