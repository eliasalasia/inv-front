import { Route, Switch } from 'wouter';
import Navbar from './components/Navbar';
import Ventas from './Pages/Ventas';
import Inventario from './Pages/Inventario';
import Compras from './Pages/Compras';
import Clientes from './Pages/Clientes';
import CreateClient from './Pages/CreateClient';
import EditClient from './Pages/EditClient';
import EditarCompra from './Pages/EditarCompra';


function Root() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Switch>
          <Route path="/" component={Ventas} />
          <Route path="/ventas" component={Ventas} />
          <Route path="/inventario" component={Inventario} />
          <Route path="/compras" component={Compras} />
          <Route path="/compras/editar/:id" component={EditarCompra} />
          <Route path="/clientes" component={Clientes} />
          <Route path="/clientes/crear" component={CreateClient} />
          <Route path="/clientes/editar/:id" component={EditClient} />
        </Switch>
      </div>
    </div>
  );
}

export default Root;
