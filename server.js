const jsonServer = require("json-server");
const path = require("path");
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

// Configura los middlewares
server.use(middlewares);
server.use(jsonServer.bodyParser);

// Configura los encabezados CORS
server.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://personajes-historicos-app.vercel.app"
  );
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Configura la ruta para servir imágenes estáticas
server.use(
  "/characters",
  jsonServer.static(path.join(__dirname, "public/characters"))
);

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
