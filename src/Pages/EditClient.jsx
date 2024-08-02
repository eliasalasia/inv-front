import { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams, useLocation } from 'wouter';
import { fetchCliente, updateCliente } from '../Api/ApiClientes';

function EditClient() {
  const { id } = useParams();
  const [, navigate] = useLocation();  
  const queryClient = useQueryClient();

  const { data: cliente, isLoading, error } = useQuery(['cliente', id], () => fetchCliente(id));

  const mutation = useMutation(
    ({ id, cliente }) => updateCliente({ id, cliente }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('clientes');
        navigate('/clientes'); 
      },
    }
  );

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');

  useEffect(() => {
    if (cliente) {
      setNombre(cliente.nombre);
      setEmail(cliente.email);
      setTelefono(cliente.telefono);
      setDireccion(cliente.direccion);
    }
  }, [cliente]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedCliente = { nombre, email, telefono, direccion };
    mutation.mutate({ id, cliente: updatedCliente });
  };

  if (isLoading) return <div className="flex justify-center items-center h-screen">Cargando...</div>;
  if (error) return <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">Error al cargar el cliente</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-color-dullgreen">Editar Cliente</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <label className="block text-gray-700">Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Teléfono:</label>
          <input
            type="text"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Dirección:</label>
          <input
            type="text"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <button type="submit" className="bg-color-darkdew text-white px-4 py-2 rounded">Actualizar Cliente</button>
      </form>
    </div>
  );
}

export default EditClient;
