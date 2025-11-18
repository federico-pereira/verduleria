import axiosInstance from './AxiosInstance';

// GET ALL
export const getProductos = async () => {
  try {
    const response = await axiosInstance.get('/productos');
    return response.data;
  } catch (error) {
    console.error('Error fetching productos', error);
    throw error;
  }
};

// GET BY ID
export const getProductoById = async (id) => {
  try {
    const response = await axiosInstance.get(`/productos/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching producto by ID', error);
    throw error;
  }
};

// ADD
export const addProducto = async (newProducto) => {
  try {
    const response = await axiosInstance.post('/productos', newProducto);
    return response.data;
  } catch (error) {
    console.error('Error adding producto', error);
    throw error;
  }
};

// UPDATE
export const updateProducto = async (id, updatedProducto) => {
  try {
    const response = await axiosInstance.put(`/productos/${id}`, updatedProducto);
    return response.data;
  } catch (error) {
    console.error('Error updating producto', error);
    throw error;
  }
};

// DELETE
export const deleteProducto = async (id) => {
  try {
    const response = await axiosInstance.delete(`/productos/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting producto', error);
    throw error;
  }
};
