import { Knex } from "knex";
import { ETableNames } from "../ETableNames";
import axios from 'axios';
import { ICidade } from "../models";


export const seed = async (knex: Knex) => {

    //precisa verificar antes de inserir se já existem cidades ou se já ocorreu algum seed,
    //visto que as seeds rodam automaticamente, e assim pode ficar inserindo elas varias e varias vezes
    const [{ count }] = await knex(ETableNames.cidade).count<[{count: number}]>('* as count')

    if (!Number.isInteger(count) || Number(count) > 0 ) {
        return
    }

    let cidadesToInsert: Omit<ICidade, 'id'>[] = []
    

    const cidades = await getCidades()
    if (cidades instanceof Error) {
        cidadesToInsert = [{nome: 'Joinville'}, {nome: 'Jaraguá do sul'}, {nome: 'Blumenau'}, {nome: 'Araquari'}, {nome: 'Florianopolis'}];
        await knex(ETableNames.cidade).insert(cidadesToInsert);
        return
    }
    cidadesToInsert = cidades;
    await knex(ETableNames.cidade).insert(cidadesToInsert);

}



const getCidades = async (): Promise< Omit<ICidade, 'id'>[] | Error> => {
    const url = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/SC/distritos'
    try {

        let arrayICidade: Omit<ICidade, 'id'>[] = []

        const allCidades = await axios.get(url);
    
        allCidades.data.map((cidade: any) => {
            arrayICidade.push({nome: cidade.municipio.nome})
        })

        return arrayICidade
    } catch (error) {
        return new Error()       
    }
}