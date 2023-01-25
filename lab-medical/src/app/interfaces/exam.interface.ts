export default interface Exam {
    idDoPaciente: number;
    idDoExame: number;
    nome: string;
    dataDoExame: string;
    horario: string;
    tipoDoExame: string;
    laboratorio: string;
    url?: string;
    resultados: string;
}