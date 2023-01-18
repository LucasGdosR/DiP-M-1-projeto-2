import { Time } from "@angular/common";

export default interface Appointment {
    idDoPaciente: number;
    motivo: string;
    dataDaConsulta: Date;
    horario: Time;
    descricao: string;
    medicacao?: string;
    dosagemEPrecaucoes: string;
}