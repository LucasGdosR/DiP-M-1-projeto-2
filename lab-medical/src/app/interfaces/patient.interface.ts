import Address from "./address.interface";

export default interface Patient {
    id: number;
    nomeCompleto: string;
    genero: string;
    dataDeNascimento: Date;
    cpf: string;
    rg: string;
    estadoCivil: string;
    telefone: string;
    email?: string;
    naturalidade: string;
    contatoDeEmergencia: string;
    listaDeAlergias?: string;
    listaDeCuidadosEspecificos?: string;
    convenio?: string;
    numeroDoConvenio?: number;
    validadeDoConvenio?: Date;
    endereco: Address;
}