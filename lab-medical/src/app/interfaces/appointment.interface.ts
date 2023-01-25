export default interface Appointment {
    idDoPaciente: number;
    idDaConsulta: number;
    motivo: string;
    date: string;
    horario: string;
    descricao: string;
    medicacao?: string;
    dosagemEPrecaucoes: string;
}