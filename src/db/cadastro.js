import { GenerateID } from "../config/ID.js";
import { connection } from "./config.js";
import { databaseDate } from "./dates.js";

const dates = new databaseDate();

export class DatabaseSQL {
	async create(infos) {
		const idCadastro = GenerateID();
		// Puxa os dados passado pelo post
		const { nome, email, senha, telefone } = infos;
		// insere no banco de dados
		const sql =
			"INSERT INTO infos (Id, Nome, Email, senha, telefone) VALUES (?, ?, ?, ?, ?)";
		const values = [idCadastro, nome, email, senha, telefone];

		// Aqui executa a inserção
		try {
			const insercao = await connection.query(sql, values);
			if (insercao) {
				await dates.create(idCadastro);
			}else{
                console.error("Impossivel Inserrir dates"); 
            }
		} catch (error) {
			console.error("Erro ao inserir no banco de dados:", error);
		}
	}
}
