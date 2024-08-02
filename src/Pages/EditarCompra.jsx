import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchCompra, updateCompra } from '../Api/ApiCompras';
import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import Logo from '../assets/Logo/GUCCILogo.png';
import logowhite from '../assets/Logo/gucci0.png';

function EditarCompra() {
  const [location] = useLocation();
  const id = location[0].split('/').pop(); // Obtiene el ID de la ruta
  const queryClient = useQueryClient();
  const { data: compra, isLoading, error } = useQuery(['compras', id], () => fetchCompra(id));
  const mutation = useMutation((updatedCompra) => updateCompra(id, updatedCompra), {
    onSuccess: () => {
      queryClient.invalidateQueries('compras');
    },
  });

  const [proveedorId, setProveedorId] = useState('');
  const [total, setTotal] = useState('');
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    if (compra) {
      setProveedorId(compra.proveedor_id);
      setTotal(compra.total);
      setProductos(compra.productos || []); // Asegúrate de que compra.productos sea un arreglo
    }
  }, [compra]);

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ proveedor_id: proveedorId, total, productos });
  };

  const handleAddProduct = () => {
    setProductos([...productos, { id: '', cantidad: '', precio: '' }]);
  };

  const handleProductChange = (index, e) => {
    const newProducts = [...productos];
    newProducts[index][e.target.name] = e.target.value;
    setProductos(newProducts);
  };

  const handleRemoveProduct = (index) => {
    const newProducts = productos.filter((_, i) => i !== index);
    setProductos(newProducts);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-sky-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> No se pudo cargar la compra. {error.message}</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-color-dullgreen">Editar Compra</h1>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold bg-color-lighdew text-white p-4 flex items-center">
            <img src={logowhite} alt="Logo" className="h-8 w-18 inline-block mr-2" />
            Actualizar Compra
          </h2>
          <div className="mb-4">
            <label htmlFor="proveedorId" className="block text-sm font-medium text-gray-700">Proveedor ID</label>
            <input
              type="text"
              id="proveedorId"
              value={proveedorId}
              onChange={(e) => setProveedorId(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="total" className="block text-sm font-medium text-gray-700">Total</label>
            <input
              type="number"
              id="total"
              value={total}
              onChange={(e) => setTotal(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          {productos.map((producto, index) => (
            <div key={index} className="mb-4 flex items-center">
              <div className="flex-1">
                <label htmlFor={`productoId${index}`} className="block text-sm font-medium text-gray-700">Producto ID</label>
                <input
                  type="text"
                  name="id"
                  id={`productoId${index}`}
                  value={producto.id}
                  onChange={(e) => handleProductChange(index, e)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="flex-1 ml-4">
                <label htmlFor={`cantidad${index}`} className="block text-sm font-medium text-gray-700">Cantidad</label>
                <input
                  type="number"
                  name="cantidad"
                  id={`cantidad${index}`}
                  value={producto.cantidad}
                  onChange={(e) => handleProductChange(index, e)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="flex-1 ml-4">
                <label htmlFor={`precio${index}`} className="block text-sm font-medium text-gray-700">Precio</label>
                <input
                  type="number"
                  name="precio"
                  id={`precio${index}`}
                  value={producto.precio}
                  onChange={(e) => handleProductChange(index, e)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <button
                type="button"
                onClick={() => handleRemoveProduct(index)}
                className="ml-4 bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Eliminar
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddProduct}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Agregar Producto
          </button>
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}

export default EditarCompra;
