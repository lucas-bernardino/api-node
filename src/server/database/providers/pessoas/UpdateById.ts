import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPessoa } from "../../models";


export const updateById = async (id: number, pessoa: Omit<IPessoa, 'id'>): Promise<void | Error> => {

    try {

        // como cada pessoa está linkada a uma cidade, precisa verificar se essa cidade 
        // existe no banco de dados antes de dar o update  
        const [{ count }] = await Knex(ETableNames.cidade)
            .where('id', pessoa.cidadeId)
            .count<[{ count: number }]>('* as count')
        
        if (count === 0) {
            return new Error("A cidade usada no cadastro nao foi encontrada")
        }

        const result = await Knex(ETableNames.pessoa).where('id', id).update({
            id: id,
            nome: pessoa.nome,
            email: pessoa.email,
            cidadeId: pessoa.cidadeId
        })

        if (result === 1) { 
            return; 
        }

        return new Error('Esse ID nao existe')


    } catch (error) {
        return new Error('Erro ao atualizar por ID')
    }
    
}