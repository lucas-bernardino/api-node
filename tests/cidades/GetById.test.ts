import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup'


describe('Cidades - GetById', () => {

    it('GetById: correto', async () => {
        const resposta_create = await testServer.post('/cidades').send({nome: 'joinville'});

        expect(resposta_create.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof resposta_create.body).toEqual('number');

        
        const resposta_getid = await testServer.get(`/cidades/${resposta_create.body}`)

        expect(resposta_getid.statusCode).toEqual(StatusCodes.OK);
        expect(resposta_getid.body).toHaveProperty('nome');
        expect(resposta_getid.body).toHaveProperty('id');
    })

})