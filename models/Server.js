import express from "express";
import cors from "cors";
import userRoutes from "../routes/UserRoutes";
import authRoutes from "../routes/AuthRoutes";
import { dbConnection } from "../database/Config";

class Server {
  constructor() {
    this.basePath = "/api";
    this.app = express();
    this.port = process.env.APP_PORT;
    this.connectDatabase();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.static("public"));
    this.app.use(cors());
    this.app.use(express.json()); //Poder obtener el body de las request
  }

  connectDatabase() {
    dbConnection();
  }

  routes() {
    this.app.use(this.basePath, userRoutes);
    this.app.use(this.basePath, authRoutes);
  }

  listen() {
    this.app.listen(this.port, () =>
      console.log(`Servidor corriendo en puerto ${this.port}`),
    );
  }
}

export default Server;
