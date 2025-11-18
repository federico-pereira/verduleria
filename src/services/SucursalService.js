import axiosInstance from './AxiosInstance';

// GET ALL
export const getSucursals = async () => {
  try {
    const response = await axiosInstance.get('/sucursals');
    return response.data;
  } catch (error) {
    console.error('Error fetching sucursals', error);
    throw error;
  }
};

// GET BY ID
export const getSucursalById = async (id) => {
  try {
    const response = await axiosInstance.get(`/sucursals/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching sucursal by ID', error);
    throw error;
  }
};

// ADD
export const addSucursal = async (newSucursal) => {
  try {
    const response = await axiosInstance.post('/sucursals', newSucursal);
    return response.data;
  } catch (error) {
    console.error('Error adding sucursal', error);
    throw error;
  }
};

// UPDATE
export const updateSucursal = async (id, updatedSucursal) => {
  try {
    const response = await axiosInstance.put(`/sucursals/${id}`, updatedSucursal);
    return response.data;
  } catch (error) {
    console.error('Error updating sucursal', error);
    throw error;
  }
};

// DELETE
export const deleteSucursal = async (id) => {
  try {
    const response = await axiosInstance.delete(`/sucursals/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting sucursal', error);
    throw error;
  }
};
