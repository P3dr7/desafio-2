import { connection } from "../db/config.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

export async function verifyEmailExists(email) {
	try {
		const resultEmail = await connection.query(
			"SELECT Id FROM infos WHERE Email = ?",
			[email]
		);
		const emailExists =
			resultEmail && resultEmail.length > 0 && resultEmail[0].length > 0;
		if (emailExists) {
			return resultEmail[0][0].Id;
		}
	} catch (error) {
		console.error("Erro ao verificar o email:", error);
		throw error;
	}
}

export async function verifyNameExists(name) {
	try {
		const resultName = await connection.query(
			"SELECT Id, Email FROM infos WHERE Nome = ?",
			[name]
		);
		const nameExists =
			resultName && resultName.length > 0 && resultName[0].length > 0;
		if (nameExists) {
			return resultName[0][0];
		}
	} catch (error) {
		console.error("Erro ao verificar o nome:", error);
		throw error;
	}
}

export async function getValues(id) {
	try {
		const resultValues = await connection.query(
			"SELECT dates.* FROM dates JOIN define ON dates.Id_Date = define.fk_define_dates_id_dates JOIN infos ON define.fk_define_infos_id = infos.Id WHERE infos.Id = ?",
			id
		);
		if (resultValues && resultValues.length > 0 && resultValues[0].length > 0) {
			return resultValues[0][0];
		}
	} catch (error) {
		console.error("Erro ao recuperar valores:", error);
		throw error;
	}
}

export async function getIdDate(idCad) {
	try {
		const resultValues = await connection.query(
			"select fk_define_dates_id_dates from define where fk_define_infos_id = ?",
			idCad
		);
		if (resultValues && resultValues.length > 0 && resultValues[0].length > 0) {
			return resultValues[0][0].fk_define_dates_id_dates;
		}
	} catch (error) {
		console.error("Erro ao recuperar valores:", error);
		throw error;
	}
}

export async function GetValue(name) {
	const verifyName = await verifyNameExists(name);
	try {
		if (!verifyName) {
			throw new Error("Nome Inexistente");
		}

		const data = await verifyNameExists(name);
		// console.log(data)

		const { Id, Email } = data;

		const values = await getValues(Id);
		delete values.Id_Date;
		const { Insert_Date, Last_Update, Last_Login } = values;

		const secret = process.env.passwordPrivate
		
		const token = jwt.sign({ name }, secret, {
			algorithm: "RS256",
			expiresIn: 1800,
		});

		const array = {
			Id,
			data_criacao: Insert_Date.toLocaleString(),
			data_atualizacao: Last_Update.toLocaleString(),
			ultimo_login: Last_Login.toLocaleString(),
			token,
		};
		return array;
	} catch (error) {
		console.error("Erro ao pegar Infos:", error);
		return reply
			.status(500)
			.send({ error: "Ocorreu um erro interno do servidor." });
	}
}

export async function getValuesByName(name){
	try {
		const resultValues = await connection.query(
			"select * from infos where Nome = ?",
			name
		);
		if (resultValues && resultValues.length > 0 && resultValues[0].length > 0) {
			return resultValues[0][0];
		}
	} catch (error) {
		console.error("Erro ao recuperar valores:", error);
		throw error;
	}
}
