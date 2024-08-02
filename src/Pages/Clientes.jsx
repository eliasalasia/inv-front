import { useQuery } from 'react-query';
import { fetchClientes } from '../Api/ApiClientes';
import { Link } from 'wouter';
import  Logo  from '../assets/Logo/GUCCILogo.png'
import logowhite from '../assets/Logo/gucci0.png'

function Clientes() {
  const { data: clientes, isLoading, error } = useQuery('clientes', fetchClientes);

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
        <span className="block sm:inline"> No se pudieron cargar los clientes. {error.message}</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      
      <h1 className="text-3xl font-bold mb-6 text-color-dullgreen">Registro de Clientes</h1>
      <div className="mb-8">
        <Link href="/clientes/crear">
          <div className="bg-yellow-700 text-white px-4 py-2 rounded cursor-pointer">Crear Cliente</div>
        </Link>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <h2 className="text-xl font-semibold bg-color-lighdew text-white p-4" 
          >
             <img
              src={logowhite}
              alt="Ilustración de lista de ventas"
              className="h-8 w-18 inline-block ml-2"
            />
            Lista de Clientes
          </h2>
          <ul className="divide-y divide-gray-200">
            {clientes && clientes.length > 0 ? (
              clientes.map((cliente) => (
                <li 
                  key={cliente.id}
                  className="p-4 hover:bg-purple-50 cursor-pointer transition duration-150 ease-in-out"
                >
                  <p className="text-lg font-medium text-gray-900">Cliente ID: {cliente.id}</p>
                  <p className="text-2xl text-gray-500">Nombre: {cliente.nombre}</p>
                  <Link href={`/clientes/editar/${cliente.id}`}>
                    <div className="text-red-400 cursor-pointer text-xl">Editar</div>
                  </Link>
                </li>
              ))
            ) : (
              <li className="p-4 text-gray-500">No hay clientes disponibles</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Clientes;
