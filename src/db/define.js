import { GenerateID } from '../config/ID.js';
import { connection } from './config.js';

export class databaseDefine {
	async create(idInfos, IdDates) {

		// insere no banco de dados
        const sql = 'INSERT INTO define (fk_define_infos_id, fk_define_dates_id_dates) VALUES (?, ?)';
        const values = [idInfos, IdDates];
		
		// Aqui executa a inserção 
		try {
			await connection.query(sql, values);
		} catch (error) {
			console.error("Erro ao inserir no banco de dados:", error);
		}
		
    };
}
