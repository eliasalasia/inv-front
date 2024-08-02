import { useQuery } from 'react-query';
import { fetchVentas } from '../Api/ApiVentas';
import IngresarVenta from './IngresarVenta';
import { useState, useEffect } from 'react';
import  Logo  from '../assets/Logo/GUCCILogo.png'
import logowhite from '../assets/Logo/gucci0.png'

function Ventas() {
  const { data: ventas, isLoading, error } = useQuery('ventas', fetchVentas);
  const [selectedVenta, setSelectedVenta] = useState(null);

  useEffect(() => {
    console.log('Ventas:', ventas);
    console.log('isLoading:', isLoading);
    console.log('error:', error);
    if (ventas) {
      console.log('Número de ventas:', ventas.length);
    }
  }, [ventas, isLoading, error]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-slate-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> No se pudieron cargar las ventas. {error.message}</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-color-greenforest">
      <img
          src={Logo}
          alt="Marca"
          className="h-6 w-18 inline-block ml-2"
        />
        Registro de Ventas
      </h1>
      <div className="mb-8">
        <IngresarVenta />
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <h2 className="text-xl font-semibold bg-color-lighdew text-white p-4">
          <img
              src={logowhite}
              alt="Ilustración de lista de ventas"
              className="h-8 w-18 inline-block ml-2"
            />
            Lista de Ventas
          </h2>
          <ul className="divide-y divide-gray-200">
            {ventas && ventas.length > 0 ? (
              ventas.map((venta) => (
                <li
                  key={venta.id}
                  className="p-4 hover:bg-purple-50 cursor-pointer transition duration-150 ease-in-out"
                  onClick={() => setSelectedVenta(venta)}
                >
                  <p className="text-lg font-medium text-gray-900">Venta ID: {venta.id}</p>
                  <p className="text-sm text-gray-500">Total: ${venta.total}</p>
                  <button className="bg-color-dullgreen hover:bg-green-800 text-white font-bold py-2 px-4 rounded-full">
                    Ver Detalles
                  </button>
                </li>
              ))
            ) : (
              <li className="p-4 text-gray-500">No hay ventas disponibles</li>
            )}
          </ul>
        </div>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <h2 className="text-xl font-semibold bg-color-lighdew text-white p-4">
          <img
              src={logowhite}
              alt="Ilustración de detalle de venta"
              className="h-8 w-18 inline-block ml-2"
            />
            Detalles de la Venta
          </h2>
          {selectedVenta ? (
            <div className="p-4">
              <p className="text-lg font-medium text-gray-900">ID: {selectedVenta.id}</p>
              <p className="text-md text-gray-600">Total: ${selectedVenta.total}</p>
            </div>
          ) : (
            <p className="p-4 text-gray-500">Selecciona una venta para ver los detalles</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Ventas;
