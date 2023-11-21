import { connection } from "./config.js";

export async function attLogin(idDate) {
	const sql = "UPDATE dates SET Last_Login = CURRENT_TIMESTAMP WHERE Id_Date = ?";

	try {
		connection.query(sql, idDate);
	} catch (error) {
		Console.log("Erro ao atualizar o login:", Error);
	}
}
