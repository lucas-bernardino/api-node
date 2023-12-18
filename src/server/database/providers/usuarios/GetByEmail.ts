import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IUsuario } from "../../models";



export const getByEmail = async (email: string): Promise<IUsuario | Error> => {
    try {
        const result = await Knex(ETableNames.usuario).where('email', '=', email).first()
        if (result) {
            return result;
        }
        return new Error('Usuario nao encontrado')
    } catch (error) {
        return new Error('Erro ao buscar usuario')
    }
}