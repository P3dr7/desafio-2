import bcrypt from "bcrypt";
import { DatabaseSQL } from "../db/cadastro.js";
import {
	verifyEmailExists,
	GetValue
} from "../config/Verify.js";


const database = new DatabaseSQL();

export const cadastra = async (request, reply) => {
	const dadosRecebidos = request.body;

	const { nome, email, senha, telefone } = dadosRecebidos;

	let telefoneC = telefone[0].numero;
	let DDD = telefone[0].ddd;
	const NTelefone = DDD + telefoneC;
	// console.log(NTelefone)

	const senhaHash = await bcrypt.hash(senha, 10); // 10 é o número de rounds de salting

	try {
		const VerifyEmail = await verifyEmailExists(email);
		if (VerifyEmail) {
			return reply.status(400).send({ "mensagem": "Email já existente" });
		}

		await database.create({
			nome,
			email,
			senha: senhaHash,
			telefone: NTelefone,
		});

		const infos = await GetValue(nome);

		return reply.status(201).send(infos);
	} catch (error) {
		console.error("Erro ao criar cadastro:", error);
		return reply
			.status(500)
			.send({ error: "Ocorreu um erro interno do servidor." });
	}
};

