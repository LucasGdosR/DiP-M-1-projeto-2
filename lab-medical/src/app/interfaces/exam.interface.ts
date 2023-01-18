import { Time } from "@angular/common";

export default interface Exam {
    idDoPaciente: number;
    nome: string;
    dataDoExame: Date;
    horario: Time;
    tipoDoExame: string;
    laboratorio: string;
    url?: string;
    resultados: string;
}