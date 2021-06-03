import { Estado } from "./Estado";
import { Pessoa } from "./Pessoa";

export interface Endereco {
    enderecoId: number;
    pessoa: Pessoa;
    estado: Estado;
    logradouro: string;
    numero: number;
    complemento: string;
    bairro: string;
    cep: string;
    cidade: string;
}