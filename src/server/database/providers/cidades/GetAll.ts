import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICidade } from "../../models";


export const getAll = async (page: number, limit: number, filter: string, id = 0): Promise<ICidade[] | Error> => {

    try {
        const result = await Knex(ETableNames.cidade)
            .select('*')
            .where('id', Number(id))
            .orWhere('nome', 'like', `%${filter}%`) // nao precisa ser a palavra inteira, só uma letra contida já retorna a cidade (devido ao like)
            .offset((page - 1) * limit)
            .limit(limit); // se tiver 100 registros e mandar 10 como limite, ele retorna apenas 10

        if (id > 0 && result.every((item) => item.id !== id)) {
            const resultById = await Knex(ETableNames.cidade)
                .select('*')
                .where('id', '=', id)
                .first()
            
            if (resultById) {
                return [...result, resultById]
            }
        }

        return result;

    } catch (error) {
        return new Error('Ocorreu um erro ao buscar todos os dados')
    }


}