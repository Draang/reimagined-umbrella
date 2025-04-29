//config de server
// por medio de handlers
import express from "express";
import router from "./router";
import db from "./config/db";
import colors from "colors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec, { swaggerUiOptions } from "./config/swagger";
//conexion a db
export async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    //console.log(colors.bgGreen.bold.italic.white(" Conexion exitosa "));
  } catch (error) {
    console.error(colors.bgRed.black.bold("Error conectando a db"));
  }
}
connectDB();
//instancia de express
const server = express();
//leer datos de forms
server.use(express.json());
server.use("/api/products", router);
// Docs
server.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, swaggerUiOptions)
);
export default server;
