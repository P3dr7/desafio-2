import { cadastra } from "./controllers/cadastro.js";
import { Login } from "./controllers/login.js";
import { recuperaDados } from "./controllers/recupera.js";
export default function (fastify, options, done) {
    fastify.post("/cadastro", cadastra)
    fastify.post("/login", Login)
    fastify.get("/recupera", recuperaDados)

    done();
}