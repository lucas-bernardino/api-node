import supertest from 'supertest';

import { server } from '../src/server/Server';
import { Knex } from '../src/server/database/knex';

beforeAll(async () => {
    await Knex.migrate.latest()
}); // precisa fazer isso para o banco de dados migrar (tipo iniciar) as tabelas antes de começar os testes

afterAll(async() => {
    await Knex.destroy(); // tem que destroir o DB pois é somente testes e pra nao mexer em dados reais
})

export const testServer = supertest(server);



