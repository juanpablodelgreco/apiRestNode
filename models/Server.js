import express from "express";
import cors from "cors";
import routes from "../routes/UsersRoutes";

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.APP_PORT;
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.static("public"));
    this.app.use(cors());
    this.app.use(express.json()) //Poder obtener el body de las request
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
