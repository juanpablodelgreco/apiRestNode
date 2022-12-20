import express from "express";
import cors from "cors";
import routes from "../routes/UserRoutes";
import { dbConnection } from "../database/Config";

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.APP_PORT;
    this.middlewares();
    this.connectDatabase();
    this.routes();
  }

  middlewares() {
    this.app.use(express.static("public"));
    this.app.use(cors());
    this.app.use(express.json()) //Poder obtener el body de las request
  }

  connectDatabase(){
    dbConnection();
  }

  routes() {
    this.app.use("/api", routes);
  }

  listen() {
    this.app.listen(this.port, () =>
      console.log(`Servidor corriendo en puerto ${this.port}`),
    );
  }
}

export default Server;
