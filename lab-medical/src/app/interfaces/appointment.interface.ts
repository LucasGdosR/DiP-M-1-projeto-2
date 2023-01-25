export default interface Appointment {
    idDoPaciente: number;
    idDaConsulta: number;
    motivo: string;
    dataDaConsulta: string;
    horario: string;
    descricao: string;
    medicacao?: string;
    dosagemEPrecaucoes: string;
}