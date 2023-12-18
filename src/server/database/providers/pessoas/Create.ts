import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPessoa } from "../../models";

export const create = async (pessoa: Omit<IPessoa, 'id'>): Promise<number | Error> => {

    try {

        // como cada pessoa está linkada a uma cidade, precisa verificar se essa cidade 
        // existe no banco de dados antes de dar o create
        const [{ count }] = await Knex(ETableNames.cidade)
          .where('id', pessoa.cidadeId)
          .count<[{ count: number }]>('* as count');
        
        if (count === 0) {
          return new Error("A cidade usada no cadastro nao foi encontrada")
        }

        const [result] = await Knex(ETableNames.pessoa).insert(pessoa).returning('id')
        if (typeof result === 'object') {
          return result.id
        } else if (typeof result === 'number') {
          return result
        }

        return new Error("Erro ao cadastrar registro")
    } catch (error) {
        console.log(error)
      
        return new Error('Erro ao cadastrar o registro');
    }

}
