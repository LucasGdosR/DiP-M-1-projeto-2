export default interface Exam {
    idDoPaciente: number;
    idDoExame: number;
    nome: string;
    date: string;
    horario: string;
    tipoDoExame: string;
    laboratorio: string;
    url?: string;
    resultados: string;
}