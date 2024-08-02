import axios from 'axios';

const API_URL = 'http://localhost:3000/api/compras';

// Obtener todas las compras
export const fetchCompras = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};

// Obtener una compra por ID
export const fetchCompra = async (id) => {
  const { data } = await axios.get(`${API_URL}/${id}`);
  return data;
};

// Crear una nueva compra
export const createCompra = async (compra) => {
  const { data } = await axios.post(API_URL, compra);
  return data;
};

// Actualizar una compra existente
export const updateCompra = async (id, compra) => {
  const { data } = await axios.put(`${API_URL}/${id}`, compra);
  return data;
};

// Eliminar una compra existente
export const deleteCompra = async (id) => {
  const { data } = await axios.delete(`${API_URL}/${id}`);
  return data;
};
