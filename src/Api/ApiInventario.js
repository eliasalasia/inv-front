import axios from 'axios';

const API_URL = 'http://localhost:3000/api/inventario';

export const fetchInventario = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};
