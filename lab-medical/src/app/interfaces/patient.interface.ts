import Address from "./address.interface";

export default interface Patient {
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