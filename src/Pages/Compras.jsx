import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchCompras, createCompra } from '../Api/ApiCompras';
import { useState } from 'react';
import { Link } from 'wouter';
import Logo from '../assets/Logo/GUCCILogo.png';
import logowhite from '../assets/Logo/gucci0.png';

function Compras() {
  const { data: compras, isLoading, error } = useQuery('compras', fetchCompras);
  const queryClient = useQueryClient();
  const mutation = useMutation(createCompra, {
    onSuccess: () => {
      queryClient.invalidateQueries('compras');
    },
  });

  const [proveedorId, setProveedorId] = useState('');
  const [total, setTotal] = useState('');
  const [productos, setProductos] = useState([{ id: '', cantidad: '', precio: '' }]);

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
        <span className="block sm:inline"> No se pudieron cargar las compras. {error.message}</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-color-dullgreen">Registro de Compras</h1>
      
      {/* Formulario para crear una compra */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold bg-color-lighdew text-white p-4 flex items-center">
            <img src={logowhite} alt="Logo" className="h-8 w-18 inline-block mr-2" />
            Crear Compra
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
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Productos</label>
            {productos.map((producto, index) => (
              <div key={index} className="mb-4">
                <input
                  type="text"
                  name="id"
                  value={producto.id}
                  onChange={(e) => handleProductChange(index, e)}
                  placeholder="ID Producto"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm mb-2"
                />
                <input
                  type="number"
                  name="cantidad"
                  value={producto.cantidad}
                  onChange={(e) => handleProductChange(index, e)}
                  placeholder="Cantidad"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm mb-2"
                />
                <input
                  type="number"
                  name="precio"
                  value={producto.precio}
                  onChange={(e) => handleProductChange(index, e)}
                  placeholder="Precio"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm mb-2"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveProduct(index)}
                  className="px-2 py-1 bg-red-500 text-white rounded-md mt-2"
                >
                  Eliminar Producto
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddProduct}
              className="px-4 py-2 bg-green-500 text-white rounded-md"
            >
              Añadir Producto
            </button>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Crear Compra
          </button>
        </div>
      </form>

      {/* Mostrar las compras */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <h2 className="text-xl font-semibold bg-color-lighdew text-white p-4 flex items-center">
          <img src={logowhite} alt="Logo" className="h-8 w-18 inline-block mr-2" />
          Lista de Compras
        </h2>
        <ul className="divide-y divide-gray-200">
          {compras && compras.length > 0 ? (
            compras.map((compra) => (
              <li
                key={compra.id}
                className="p-4 hover:bg-purple-50 cursor-pointer transition duration-150 ease-in-out"
              >
                <p className="text-lg font-medium text-gray-900">Compra ID: {compra.id}</p>
                <p className="text-2xl text-gray-500">Total: ${compra.total}</p>
                <Link href={`/compras/editar/${compra.id}`}>
                  <div className="text-red-400 cursor-pointer text-xl">Editar</div>
                </Link>
              </li>
            ))
          ) : (
            <li className="p-4 text-gray-500">No hay compras disponibles</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Compras;
