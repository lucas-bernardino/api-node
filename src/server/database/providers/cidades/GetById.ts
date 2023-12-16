import { ETableNames } from "../../ETableNames"
import { Knex } from "../../knex"
import { ICidade } from "../../models"


export const getById = async (id: number): Promise< ICidade | Error> => {
    
    try {
        
        const result: any = await Knex(ETableNames.cidade).where('id', id)
        
        if (typeof result === 'object' && result.length > 0) {
            console.log('L13', result[0])
            return result[0]
        }

        console.log('L17', result)

        return new Error('Esse ID nao existe')

    } catch (error) {
        
        return new Error('Erro ao buscar ID')
    }

}