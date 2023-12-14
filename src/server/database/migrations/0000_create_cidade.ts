import type { Knex } from "knex";
import { ETableNames } from "../ETableNames";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(ETableNames.cidade, (table) => {
        table.bigIncrements('id').primary().index()   
        table.string('nome', 100).checkLength('<=', 100).index().notNullable()
        
        table.comment("ESSA TABELA ARMAZENA AS CIDADES")
    }).then(() => {
        console.log(`-> Tabela ${ETableNames.cidade} criada com sucesso`)
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(ETableNames.cidade).then(() => {
        console.log(`-> Tabela ${ETableNames.cidade} excluida com sucesso`)
    })
}

