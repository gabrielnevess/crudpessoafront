import api from "./api";
import { toast } from "react-toastify";

export const deletePerson = async(id: number): Promise<any> => {
	try {
		await api.get(`/deletarPessoa/${id}`);
	} catch (error) {
		if(error?.response?.data?.message) {
			toast.error(`Ocorreu um erro: ${error?.response?.data?.message}`);
		} else {
			toast.error("Erro ao deletar a pessoa!");
		}
	}
}

export const getPersonById = async(id: number): Promise<any> => {
	try {
		const { data } = await api.get(`/buscarPessoaId/${id}`, {
			headers: {
				"Content-Type": "application/json"
			}
		});
		return data;
	} catch (error) {
		if(error?.response?.data?.message) {
			toast.error(`Ocorreu um erro: ${error?.response?.data?.message}`);
		} else {
			toast.error("Erro ao buscar a pessoa!");
		}
	}
}

export const getAllPerson = async(page: number, size: number): Promise<any> => {
	try {
		const { data } = await api.get(`/listarPessoas?offset=${page}&limit=${size}`, {
			headers: {
				"Content-Type": "application/json"
			}
		});
		return data;
	} catch (error) {
		if(error?.response?.data?.message) {
			toast.error(`Ocorreu um erro: ${error?.response?.data?.message}`);
		} else {
			toast.error("Erro ao buscar as pessoas!");
		}
	}
}