import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Button,
  Box,
  CircularProgress,
  Alert,
  AppBar,
  Toolbar,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  loadProducts,
  addProduct,
  modifyProduct,
  removeProduct,
  productCreatedBySocket,
  productUpdatedBySocket,
  productDeletedBySocket,
} from '../redux/slices/productsSlice';
import { logout } from '../redux/slices/authSlice';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';
import DeleteConfirmDialog from '../components/DeleteConfirmDialog';
import { connectSocket, disconnectSocket } from '../services/socket';

function Products() {
  const dispatch = useDispatch();
  const { items: products, loading, error } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);
  const [formOpen, setFormOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    dispatch(loadProducts());

    // Connect to socket
    const socket = connectSocket();

    socket.on('productCreated', (product) => {
      dispatch(productCreatedBySocket(product));
    });

    socket.on('productUpdated', (product) => {
      dispatch(productUpdatedBySocket(product));
    });

    socket.on('productDeleted', (productId) => {
      dispatch(productDeletedBySocket(productId));
    });

    const handleUnload = () => {
      disconnectSocket();
    };
    window.addEventListener('beforeunload', handleUnload);

    return () => {
      socket.off('productCreated');
      socket.off('productUpdated');
      socket.off('productDeleted');
      window.removeEventListener('beforeunload', handleUnload);
      disconnectSocket();
    };
  }, [dispatch]);

  const handleAddClick = () => {
    setSelectedProduct(null);
    setFormOpen(true);
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setFormOpen(true);
  };

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setDeleteDialogOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    if (selectedProduct) {
      await dispatch(modifyProduct({ id: selectedProduct._id, product: formData }));
    } else {
      await dispatch(addProduct(formData));
    }
    setFormOpen(false);
    setSelectedProduct(null);
  };

  const handleDeleteConfirm = async () => {
    await dispatch(removeProduct(selectedProduct._id));
    setDeleteDialogOpen(false);
    setSelectedProduct(null);
  };

  const handleLogout = () => {
    // disconnect socket before logging out
    disconnectSocket();
    dispatch(logout());
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Product Management
          </Typography>
          {user && (
            <>
              <Typography variant="body1" sx={{ mr: 2 }}>
                {user.username}
              </Typography>
              <IconButton color="inherit" onClick={handleLogout}>
                <LogoutIcon />
              </IconButton>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            Products
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddClick}
          >
            Add Product
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <ProductList
            products={products}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />
        )}

        <ProductForm
          open={formOpen}
          onClose={() => setFormOpen(false)}
          onSubmit={handleFormSubmit}
          product={selectedProduct}
        />

        <DeleteConfirmDialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          onConfirm={handleDeleteConfirm}
          product={selectedProduct}
        />
      </Container>
    </>
  );
}

export default Products;
