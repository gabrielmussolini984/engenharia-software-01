const request = require("supertest");
const app = require("../../src/app");

/* 
  - Store =>
    - Criar usuario feliz.
    - Erro mesma senha.
    - Erro usuário já encontrado cpf e email.
    - Erro faltando parâmetros.
*/

/*
  - Show =>
    - Mostrar usuario feliz.
    - Email inválido.
*/

describe("Testar todas funções do manter usuário", () => {

  test("Deve ser capaz de criar um usuário", async () => {
    const resposta = await request(app).post("/usuario").send({
      name: "Gabriel",
      email: "gmm@gmm.com",
      cpf: "13259208607",
      login: "gabriel984",
      senha: "123456",
      repetir_senha: "123456",
    });
    expect(resposta.body).toEqual({
      message: "Usuário criado com sucesso!",
      usuario: {
        name: "Gabriel",
        email: "gmm@gmm.com",
        cpf: "13259208607",
        login: "gabriel984",
        senha: "123456",
        pontos: 0
      },
    });
    expect(resposta.statusCode).toBe(200);
  });

  test("Deve ser capaz de listar um usuário", async () => {
    await request(app).post("/usuario").send({
      name: "Gabriel",
      email: "gmm@gmm.com",
      cpf: "13259208607",
      login: "gabriel984",
      senha: "123456",
      repetir_senha: "123456",
    });
    const resposta = await request(app).get("/usuario/gmm@gmm.com");

    expect(resposta.body).toEqual({
      usuario: {
        name: "Gabriel",
        email: "gmm@gmm.com",
        cpf: "13259208607",
        login: "gabriel984",
        senha: "123456",
        pontos: 0,
      },
    });
    expect(resposta.statusCode).toBe(200);
  });

  test("Deve ser capaz de editar um usuário", async () => {
    await request(app).post("/usuario").send({
      name: "Gabriel",
      email: "gmm@gmm.com",
      cpf: "13259208607",
      login: "gabriel984",
      senha: "123456",
      repetir_senha: "123456",
    });
    const resposta =  await request(app).put("/usuario/gmm@gmm.com").send({email: "joao@joao.com", senha: "123"})

    expect(resposta.body).toEqual({
      usuario: {
        name: "Gabriel",
        email: "joao@joao.com",
        cpf: "13259208607",
        login: "gabriel984",
        pontos: 0,
        senha: "123",
      },
    });
    expect(resposta.statusCode).toBe(200);
  });

  test("Deve ser capaz de deletar um usuário", async () => {
    await request(app).post("/usuario").send({
      name: "Gabriel",
      email: "gmm@gmm.com",
      cpf: "13259208607",
      login: "gabriel984",
      senha: "123456",
      repetir_senha: "123456",
    });
    const resposta =  await request(app).delete("/usuario/gmm@gmm.com").send({email: "joao@joao.com", senha: "123"})

    expect(resposta.body).toEqual({
      message: "Usuário deletado com sucesso!",
    });
    expect(resposta.statusCode).toBe(200);
  });
});
