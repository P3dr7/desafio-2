import jwt from "jsonwebtoken";
import { getValuesByName } from "../config/Verify.js";

export async function recuperaDados(request, reply){

    const token = request.headers['authorization']
    if (!token) {
        reply.status(401).send({ "mensagem": "Token não fornecido" });
        return;
    }
    

    try {
        const tokenPuro = token.split(' ')[1];
        const publicKey = process.env.passwordPublic
        
        const decoded = jwt.verify(tokenPuro, publicKey, { algorithms: ["RS256"] });
        
        const data = await getValuesByName(decoded.name)
        delete data.senha

        reply.send(data)
      } catch (error) {
        
        if (error instanceof jwt.TokenExpiredError) {
            reply.status(401).send({ "mensagem": "Token expirado" });
        } else if (error instanceof jwt.JsonWebTokenError) {
            reply.status(401).send({ "mensagem": "Token inválido" });
        } else {
            reply.status(500).send({ "mensagem": "Erro interno do servidor" });
        }
        console.error('Erro ao verificar o token:', error.message);
      }
}