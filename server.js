const jsonServer = require("json-server");
const path = require("path");
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

// Establecer una ruta base personalizada
server.use("/api", router);

// Obtener el puerto del entorno o establecer por defecto 5000
const PORT = process.env.PORT || 5000;

// Usar middlewares y router
server.use(middlewares);
server.listen(PORT, () => {
  const baseUrl = process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`;
  console.log(`JSON Server running on ${baseUrl}/api`);
});
