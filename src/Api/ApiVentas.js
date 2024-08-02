import axios from 'axios';

const API_URL = 'http://localhost:3000/api/ventas';

export const fetchVentas = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log('Respuesta de la API:', response);
    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching ventas:', error);
    throw error;
  }
};

export const createVenta = async (venta) => {
  try {
    const { data } = await axios.post(API_URL, venta);
    return data;
  } catch (error) {
    console.error('Error creating venta:', error);
    throw error; // Propaga el error para que pueda ser manejado por react-query
  }
};