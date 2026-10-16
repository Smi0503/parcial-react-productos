
import { useState, useEffect } from "react";
import TablaProductos from "./components/TablaProductos";
import "./App.css";

function App() {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

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

  const productosFiltrados = productos.filter((producto) =>
    producto.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  const totalStock = productos.reduce(
    (total, producto) => total + Number(producto.stock),
    0
  );

  return (
    <div className="app">
      <div className="contenedor">
        <header className="encabezado">
          <div className="barra-superior">
            <span className="logo">📦 ProductManager</span>
            <span className="etiqueta">
              Inventario
            </span>
          </div>

          <h1>Gestión de productos</h1>
          <p>
            Administra y consulta tu inventario
            desde un solo lugar.
          </p>
        </header>

        <section className="estadisticas">
          <div className="tarjeta">
            <p>Productos registrados</p>
            <h2>{productos.length}</h2>
            <span>Productos en el catálogo</span>
          </div>

          <div className="tarjeta">
            <p>Unidades en stock</p>
            <h2>{totalStock}</h2>
            <span>Inventario total disponible</span>
          </div>
        </section>

        <main className="contenido">
          <div className="cabecera-tabla">
            <div>
              <h2>Catálogo de productos</h2>
              <p>Consulta los productos registrados.</p>
            </div>
            <span className="contador">
              {productosFiltrados.length} productos
            </span>
          </div>

          <input
            className="buscador"
            type="text"
            placeholder="🔍  Buscar producto por nombre..."
            aria-label="Buscar producto por nombre"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />

          {cargando && <p>Cargando productos...</p>}

          {error && <p className="error">{error}</p>}

          {!cargando && !error && (
            <div className="tabla-contenedor">
              {productosFiltrados.length > 0 ? (
                <TablaProductos
                  productos={productosFiltrados}
                />
              ) : (
                <p className="sin-resultados">
                  No se encontraron productos.
                </p>
              )}
            </div>
          )}
        </main>

        <footer>
          Sistema de Inventario | React + Express + SQL Server
        </footer>
      </div>
    </div>
  );
}

export default App;
