import express from "express";
import dotenv from "dotenv";
import { productoRouter } from "./routes/productos.routes.js";
import { pasarelaRouter } from "./routes/pasarela.routes.js";
import mercadopago from "mercadopago";

dotenv.config();

mercadopago.configure({
  integrator_id: "dev_24c65fb163bf11ea96500242ac130004",
  access_token:
    "APP_USR-8709825494258279-092911-227a84b3ec8d8b30fff364888abeb67a-1160706432",
});

const server = express();
server.use(express.json());

server.use(productoRouter);
server.use(pasarelaRouter);
// nullish coalescing operator (??)
const port = process.env.PORT ?? 3000;

server.listen(port, () => {
  console.log(`Servidor corriendo exitosamente en el puerto ${port} 🚀`);
});
