// src/services/apiService.js
import axiosInstance from './AxiosInstance';

// Function to fetch all productos
export const getProductos = async () => {
  try {
    const response = await axiosInstance.get('/productos');
    return response.data;
  } catch (error) {
    console.error('Error fetching productos', error);
    throw error; // Rethrow error so the calling component can handle it
  }
};

// Function to add a new producto
export const addProducto = async (newProducto) => {
  try {
    const response = await axiosInstance.post('/productos', newProducto);
    return response.data;
  } catch (error) {
    console.error('Error adding producto', error);
    throw error;
  }
};

// Function to update an existing producto
export const updateProducto = async (id, updatedProducto) => {
  try {
    const response = await axiosInstance.put(`/productos/${id}`, updatedProducto);
    return response.data;
  } catch (error) {
    console.error('Error updating producto', error);
    throw error;
  }
};

// Function to delete an producto
export const deleteProducto = async (id) => {
  try {
    const response = await axiosInstance.delete(`/productos/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting producto', error);
    throw error;
  }
};
