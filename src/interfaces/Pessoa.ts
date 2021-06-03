import { Endereco } from "./Endereco";

export interface Pessoa {
    pessoaId: number;
    endereco: Endereco;
    nome: string;
    email: string;
    dataNascimento: Date;
    sexo: string;
    celular: string;
    telefone: string;
}