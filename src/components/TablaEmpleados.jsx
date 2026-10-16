
function TablaEmpleados({ empleados }) {
  return (
    <div>
      <h2>Lista de empleados</h2>

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Puesto</th>
          </tr>
        </thead>

        <tbody>
          {empleados.map((empleado) => (
            <tr key={empleado.id}>
              <td>{empleado.id}</td>
              <td>{empleado.nombre}</td>
              <td>{empleado.puesto}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaEmpleados;
