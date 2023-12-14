import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICidade } from "../../models";

export const create = async (cidade: Omit<ICidade, 'id'>): Promise<number | Error> => {

    try {
        const result: any = await Knex(ETableNames.cidade).insert(cidade).returning('id');       
         
        //precisa fazer essas duas checagens devido a diferença 
        //com que o sqlite e o postgre operam
        if (typeof result === 'object') {
          return result[0].id
        } else if (typeof result === 'number') {
          return result;
        }
        
        return new Error('Erro ao cadastrar o registro');
      
    } catch (error) {
        console.log(error)
      
        return new Error('Erro ao cadastrar o registro');
    }

}
