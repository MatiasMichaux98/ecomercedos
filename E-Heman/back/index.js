const express = require("express");
const morgan = require("morgan");
const database = require("./src/database");
const cors = require("cors");
const path = require("path");

// Configuración inicial
const app = express();
app.set("port", 4000);

// Middlewares
app.use(cors({
  origin: ["http://127.0.0.1:5501", "http://127.0.0.1:5500"]
}));
app.use(morgan("dev"));
app.use(express.json());

// Ruta para la página de inicio
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "cliente", "index.html"));
});

// Ruta para obtener productos
app.get("/productos", async (req, res) => {
  const connection = await database.getConnection();
  const result = await connection.query("SELECT * from producto");
  res.json(result);
});

// Configura una ruta para el favicon.ico (opcional)
app.get("/favicon.ico", (req, res) => {
  res.sendFile(path.join(__dirname, "cliente", "favicon.ico"));
});

app.listen(app.get("port"), () => {
  console.log("Escuchando comunicaciones al puerto " + app.get("port"));
});

/*app.post("/carrito/comprar", async (req, res) => {
  if(req.body && req.body.length > 0){
    return res.sendStatus(200);
  }
  res.sendStatus(400)
})*/