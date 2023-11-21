import { randomUUID } from "node:crypto";
export function GenerateID() {
	// Limpa o UUID deixando apenas numeros
	const PacienteUUID = randomUUID().replace(/\D/g, "");
	let strNumber = String(PacienteUUID);
	if (strNumber.length > 18) {
		strNumber = strNumber.substring(0, 18);
	}
	let PacienteUUIDtrated = parseInt(strNumber, 10);
	// console.log(PacienteUUID);
	return PacienteUUIDtrated;
}
