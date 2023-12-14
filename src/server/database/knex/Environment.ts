import { Knex } from 'knex';
import path from 'path';

export const development: Knex.Config = {
    client: 'sqlite3',
    useNullAsDefault: true,

    connection: {
        filename: path.resolve(__dirname, '..', '..', '..', '..', 'database.sqlite') // para criar um arquivo na raiz do projeto
    },

    migrations: {
        directory: path.resolve(__dirname, '..', 'migrations') //__dirname guarda a localizacao do arquivo
    },

    seeds: {
        directory: path.resolve(__dirname, '..', 'seeds')
    },

    pool: { // configuracao necessaria somente para o sqlite
        afterCreate: (connection: any, done: Function) => {
            connection.run('PRAGMA foreign_keys = ON');
            done();
        }
    }
}
export const test: Knex.Config = {
    ...development, //usa as mesmas configuracoes do development
    connection: ':memory' //exclui os dados ao desligar e ligar o servidor
}
export const production: Knex.Config = {
    ...development,
}
