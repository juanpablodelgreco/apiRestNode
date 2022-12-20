import { config } from "dotenv";
import Server from "./models/Server";

config();
const server = new Server();

server.listen();
