import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { useLocation } from 'wouter';

const API_URL = 'http://localhost:3000/api/clientes';

const addCliente = async (cliente) => {
  const { data } = await axios.post(API_URL, cliente);
  return data;
};

function CreateClient() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');

  const queryClient = useQueryClient();
  const [, navigate] = useLocation();  // Use useLocation for navigation

  const mutation = useMutation(addCliente, {
    onSuccess: () => {
      queryClient.invalidateQueries('clientes');
      navigate('/clientes');  // Redirect after success
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const cliente = { nombre, email, telefono, direccion };
    mutation.mutate(cliente);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-color-dullgreen">Agregar Cliente</h1>
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
        <button type="submit" className="bg-color-darkdew text-white px-4 py-2 rounded">Crear Cliente</button>
      </form>
    </div>
  );
}

export default CreateClient;
