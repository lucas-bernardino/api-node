import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICidade } from "../../models";


export const updateById = async (id: number, cidade: Omit<ICidade, 'id'>): Promise<void | Error> => {

    try {
        const result = await Knex(ETableNames.cidade).where('id', id).update({
            id: id,
            nome: cidade.nome
        })

        if (result === 1) { 
            return; 
        }

        return new Error('Esse ID nao existe')


    } catch (error) {
        return new Error('Erro ao atualizar por ID')
    }
    
}