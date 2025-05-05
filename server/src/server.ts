//config de server
// por medio de handlers
import express from "express";
import router from "./router";
import db from "./config/db";
import colors from "colors";
import cors, { CorsOptions } from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec, { swaggerUiOptions } from "./config/swagger";
import morgan from "morgan";
//conexion a db
export async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    //console.log(colors.bgGreen.bold.italic.white(" Conexion exitosa "));
  } catch (error) {
    console.error(colors.bgRed.black.bold("Error conectando a db"), error);
  }
}
connectDB();
//instancia de express
const server = express();
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (origin == process.env.FRONTEND_URL || origin == undefined) {
      //Permitir
      callback(null, true);
    } else {
      callback(new Error("Error de CORS"), false);
    }
  },
};
server.use(cors(corsOptions));
//leer datos de forms
server.use(express.json());
//Para logging en backend
server.use(morgan("dev"));
server.use("/api/products", router);
// Docs
server.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, swaggerUiOptions)
);
export default server;
