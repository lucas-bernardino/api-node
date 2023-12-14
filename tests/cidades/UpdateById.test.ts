import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup'


describe('Cidades - UpdateById', () => {

    it('UpdateById: correto', async () => {
        const resposta_create = await testServer.post('/cidades').send({nome: 'joinville'});

        expect(resposta_create.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof resposta_create.body).toEqual('number');

        
        const resposta_update = await testServer.put(`/cidades/${resposta_create.body}`).send({nome: 'blumenau'})


        expect(resposta_update.statusCode).toEqual(StatusCodes.OK);
    })

})