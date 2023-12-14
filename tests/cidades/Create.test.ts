import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cidades - Create", () => {
  it("Cria registro: correto", async () => {
    const resposta = await testServer
      .post("/cidades")
      .send({ nome: "joinville" });

    expect(resposta.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof resposta.body).toEqual("number");
  });

  it("Cria registro: menos de tres caracteres", async () => {
    const resposta = await testServer.post("/cidades").send({ nome: "jo" });

    expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(resposta.body).toHaveProperty("errors.body.nome");
  });

  it("Cria registro: vazio", async () => {
    const resposta = await testServer.post("/cidades").send({});

    expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(resposta.body).toHaveProperty("errors.body.nome");
  });

  it("Cria registro: numero", async () => {
    const resposta = await testServer.post("/cidades").send({ nome: 1 });

    expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(resposta.body).toHaveProperty("errors.body.nome");
  });
});
