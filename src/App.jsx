
import { useState, useEffect } from "react";
import TablaProductos from "./components/TablaProductos";

function App() {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  // Obtener productos desde la API
  useEffect(() => {
    async function obtenerProductos() {
      try {
        const respuesta = await fetch(
          "http://localhost:3000/api/productos"
        );

        if (!respuesta.ok) {
          throw new Error("Error al consultar la API");
        }

        const datos = await respuesta.json();
        setProductos(datos);
      } catch (error) {
        console.error(error);
        setError("No se pudieron cargar los productos");
      } finally {
        setCargando(false);
      }
    }

    obtenerProductos();
  }, []);

  // Buscar productos utilizando useState
  const productosFiltrados = productos.filter((producto) =>
    producto.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase())
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

      {cargando && <p>Cargando productos...</p>}

      {error && <p>{error}</p>}

      {!cargando && !error && (
        <TablaProductos productos={productosFiltrados} />
      )}
    </div>
  );
}

export default App;
