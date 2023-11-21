import { GenerateID } from '../config/ID.js';
import { connection } from './config.js';
import { databaseDefine} from './define.js';

const define = new databaseDefine();

export class databaseDate {
	async create(idC) {
		const idDate = GenerateID();
		// Puxa os dados passado pelo post
		const InsertDate = new Date();

        

		// insere no banco de dados
        const sql = 'INSERT INTO dates (Id_Date, Insert_Date, Last_Update, Last_Login) VALUES (?, ?, ?, ?)';
        const values = [idDate, InsertDate, InsertDate, InsertDate];
		
		// Aqui executa a inserção 
		try {
			await connection.query(sql, values);
            await define.create(idC, idDate);
		} catch (error) {
			console.error("Erro ao inserir no banco de dados:", error);
		}
		
    };
}
