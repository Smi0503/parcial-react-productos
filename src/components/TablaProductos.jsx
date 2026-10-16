
function TablaProductos({ productos }) {
  return (
    <div>
      <h2>Listado de productos</h2>

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Producto</th>
            <th>Precio</th>
            <th>Stock</th>
          </tr>
        </thead>

        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.id}</td>
              <td>{producto.nombre}</td>
              <td>Q{producto.precio.toFixed(2)}</td>
              <td>{producto.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaProductos;
