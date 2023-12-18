import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";


export const deleteById = async (id: number): Promise<void | Error> => {
    
    try {
        const result: number = await Knex(ETableNames.pessoa).where('id', id).del()
        
        if (result === 1) {
            return;
        }

        return new Error('ID Inexistente')

    } catch (error) {
        return new Error('Erro ao deletar no banco dados')
    }   


    return;
}