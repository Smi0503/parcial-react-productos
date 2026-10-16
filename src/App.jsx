
import { useState } from "react";
import TablaProductos from "./components/TablaProductos";

function App() {
  const productos = [
    { id: 1, nombre: "Laptop", precio: 4500, stock: 10 },
    { id: 2, nombre: "Mouse", precio: 150, stock: 25 },
    { id: 3, nombre: "Teclado", precio: 250, stock: 15 },
    { id: 4, nombre: "Monitor", precio: 1200, stock: 8 },
    { id: 5, nombre: "Audífonos", precio: 350, stock: 20 }
  ];

  const [busqueda, setBusqueda] = useState("");

  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div>
      <h1>Registro de productos</h1>

      <input
        type="text"
        placeholder="Buscar producto..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <TablaProductos productos={productosFiltrados} />
    </div>
  );
}

export default App;
