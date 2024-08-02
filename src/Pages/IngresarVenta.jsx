import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { createVenta } from '../Api/ApiVentas'; 


function IngresarVenta() {
  const [cliente_id, setClienteId] = useState('');
  const [total, setTotal] = useState('');
  const [productos, setProductos] = useState([]);
  
  const queryClient = useQueryClient();
  
  const mutation = useMutation(createVenta, {
    onSuccess: () => {
      queryClient.invalidateQueries('ventas');
    }
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const venta = { cliente_id, total, productos };
    mutation.mutate(venta);
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
      <h2 className="text-xl font-semibold bg-color-lighdew text-white p-4">Agregar Venta</h2>
      <form onSubmit={handleSubmit} className="p-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Cliente ID:</label>
          <input 
            type="text" 
            value={cliente_id} 
            onChange={(e) => setClienteId(e.target.value)} 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Total:</label>
          <input 
            type="text" 
            value={total} 
            onChange={(e) => setTotal(e.target.value)} 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Productos:</label>
          <textarea 
            value={JSON.stringify(productos)} 
            onChange={(e) => setProductos(JSON.parse(e.target.value))} 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-color-dullgreen text-white py-2 px-4 rounded-md shadow-sm hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
        >
          Añadir Venta
        </button>
      </form>
    </div>
  );
}

export default IngresarVenta;
