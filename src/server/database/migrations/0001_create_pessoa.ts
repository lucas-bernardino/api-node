import { Knex } from "knex";
import { ETableNames } from "../ETableNames";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(ETableNames.pessoa, (table) => {
        table.bigIncrements('id').primary().index()
        table.string('nome', 100).checkLength("<=", 100).index().notNullable()
        table.string('email', 100).checkLength("<=", 100).unique().notNullable()
        
        //cada pessoa faz referencia a uma cidade. Cada vez que for excluir uma cidade, nao vai dar certo pois
        //a cidade possui uma conexao com a pessoa. SQL
        table.bigInteger('cidadeId').index().notNullable().references('id').inTable(ETableNames.cidade).onUpdate('CASCADE').onDelete('RESTRICT')

        table.comment("ESSA TABELA ARMAZENA AS PESSOAS")
    }).then(() => {
        console.log(`-> Tabela ${ETableNames.pessoa}`)
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(ETableNames.pessoa).then(() => {
        console.log(`-> Tabela ${ETableNames.pessoa} excluida`)
    })
}