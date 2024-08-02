import { useQuery } from 'react-query';
import {fetchInventario} from '../Api/ApiInventario'

function Inventario() {
  const { data: productos, isLoading, error } = useQuery('inventario', fetchInventario);

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar el inventario</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Inventario</h1>
      <ul>
        {productos.map((producto) => (
          <li key={producto.id} className="mb-2">
            Producto ID: {producto.id}, Nombre: {producto.nombre}, Cantidad: {producto.cantidad}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Inventario;
