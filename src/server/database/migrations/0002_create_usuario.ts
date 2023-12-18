import { Knex } from "knex";
import { ETableNames } from "../ETableNames";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(ETableNames.usuario, (table) => {
        table.bigIncrements('id').primary().index()
        table.string('nome', 100).checkLength("<=", 100).notNullable().checkLength(">=", 3)
        table.string('email', 100).checkLength("<=", 100).unique().index().notNullable().checkLength(">=", 7)
        table.string('senha', 100).checkLength("<=", 100).notNullable().checkLength(">=", 5)

        table.comment("ESSA TABELA ARMAZENA AS usuarioS")
    }).then(() => {
        console.log(`-> Tabela ${ETableNames.usuario}`)
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(ETableNames.usuario).then(() => {
        console.log(`-> Tabela ${ETableNames.usuario} excluida`)
    })
}