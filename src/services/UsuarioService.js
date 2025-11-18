import axiosInstance from './AxiosInstance';

// GET ALL
export const getUsuarios = async () => {
  try {
    const response = await axiosInstance.get('/usuarios');
    return response.data;
  } catch (error) {
    console.error('Error fetching usuarios', error);
    throw error;
  }
};

// GET BY ID
export const getUsuarioById = async (id) => {
  try {
    const response = await axiosInstance.get(`/usuarios/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching usuario by ID', error);
    throw error;
  }
};

// ADD
export const addUsuario = async (newUsuario) => {
  try {
    const response = await axiosInstance.post('/usuarios', newUsuario);
    return response.data;
  } catch (error) {
    console.error('Error adding usuario', error);
    throw error;
  }
};

// UPDATE
export const updateUsuario = async (id, updatedUsuario) => {
  try {
    const response = await axiosInstance.put(`/usuarios/${id}`, updatedUsuario);
    return response.data;
  } catch (error) {
    console.error('Error updating usuario', error);
    throw error;
  }
};

// DELETE
export const deleteUsuario = async (id) => {
  try {
    const response = await axiosInstance.delete(`/usuarios/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting usuario', error);
    throw error;
  }
};
