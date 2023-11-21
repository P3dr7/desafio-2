import bcrypt from "bcrypt";
import { connection } from "../db/config.js";
import { attLogin } from "../db/Atualiza.js";
import { getIdDate, GetValue } from "../config/Verify.js";

export async function Login(request, reply){
    try {
        const { email, senha } =  request.body
        // Buscar o usuário no banco de dados
        const [rows] = await connection.query ('SELECT * FROM infos WHERE Email = ?', [email]);

        // Verificar se o usuário foi encontrado
        if (rows.length === 0) {
            return reply.status(400).send({"mensagem":"Usuario e/ou senha invalidos"});

        }

        const user = rows[0];
        const id = user.Id
        const idDate = await getIdDate(id);
        await attLogin(idDate)

        const infos = await GetValue(user.Nome);
        // Comparar a senha fornecida com a senha armazenada
        const senhaCorreta = await bcrypt.compare(senha, user.senha);

        // Verificar se a senha está correta
        if (!senhaCorreta) {
            return reply.status(401).send({"mensagem":"Usuario e/ou senha invalidos"});
        }

        return reply.send(infos);
    }catch (error) {
        console.error('Erro ao verificar o login:', error);
        return reply.status(500).send('Erro interno do servidor');
    } 
}
