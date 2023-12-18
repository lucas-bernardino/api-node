import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPessoa } from "../../models";


export const getAll = async (page: number, limit: number, filter: string): Promise<IPessoa[] | Error> => {

    try {
        const result = await Knex(ETableNames.pessoa)
            .select('*')
            .where('nome', 'like', `%${filter}%`) // nao precisa ser a palavra inteira, só uma letra contida já retorna a pessoa (devido ao like)
            .offset((page - 1) * limit)
            .limit(limit); // se tiver 100 registros e mandar 10 como limite, ele retorna apenas 10

        return result;

    } catch (error) {
        return new Error('Ocorreu um erro ao buscar todos os dados')
    }


}