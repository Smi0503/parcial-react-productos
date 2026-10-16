
const express = require("express");
const sql = require("mssql");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Configuración de SQL Server
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER || "localhost",
  database: "ParcialProductos",
  port: 1433,
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

// API para consultar productos
app.get("/api/productos", async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);

    const resultado = await pool.request().query(`
      SELECT
        IdProducto AS id,
        Nombre AS nombre,
        Precio AS precio,
        Stock AS stock
      FROM dbo.Productos
      ORDER BY IdProducto
    `);

    res.json(resultado.recordset);
  } catch (error) {
    console.error("Error SQL:", error.message);

    res.status(500).json({
      mensaje: "Error al consultar productos"
    });
  }
});

// Iniciar servidor
app.listen(3000, () => {
  console.log("API funcionando en http://localhost:3000");
});
