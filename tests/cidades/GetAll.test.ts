import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup'


describe('Cidades - GetAll', () => {

    it('GetAll: correto', async () => {
        const resposta_create = await testServer.post('/cidades').send({nome: 'joinville'});

        expect(resposta_create.statusCode).toEqual(StatusCodes.CREATED)

        
        const resposta_getall = await testServer.get('/cidades')

        expect(resposta_getall.statusCode).toEqual(StatusCodes.OK);
        expect(resposta_getall.body.length).toBeGreaterThan(0);
        expect(Number(resposta_getall.header['x-total-count'])).toBeGreaterThan(0);

    })

})