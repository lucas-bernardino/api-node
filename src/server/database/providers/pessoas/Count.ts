import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";


export const count = async (filter = ''): Promise<number | Error> => {

    try {
        
        // conta todos os registros no banco
        const [{ count }] = await Knex(ETableNames.pessoa).where('nome', 'like', `%${filter}%`).count<[{ count: number }]>('* as count')

        if (Number.isInteger(Number(count))) {
            return Number(count)
        }

        return new Error('Ocorreu um erro ao consultar a quantidade total de registros');

    } catch (error) {

        return new Error('Ocorreu um erro ao consultar a quantidade total de registros');
        
    }

}