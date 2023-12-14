import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"


describe('Cidades - DeleteById', () => {

    it("Deleta por Id: correto", async () => {

        const resposta_create = await testServer.post('/cidades').send({nome: 'joinville'})
        
        expect(resposta_create.statusCode).toEqual(StatusCodes.CREATED)
        expect(typeof resposta_create.body).toEqual('number')


        const resposta_delete = await testServer.delete(`/cidades/${resposta_create.body}`)

        expect(resposta_delete.statusCode).toEqual(StatusCodes.OK)
    })

    it("Deleta por Id: envia string", async () => {

        const resposta = await testServer.delete('/cidades/teste')
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })

    it("Deleta por Id: envia menor que zero", async () => {

        const resposta = await testServer.delete('/cidades/-1')
        
        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resposta.body).toHaveProperty('errors.params.id')
    })
})