const request = require("supertest");
const app = require("../../src/app");

describe("Testar todas funções da entidade paciente.", () => {
  test("Deve ser capaz de criar um paciente maior de idade", async () => {
    const resposta = await request(app)
      .post("/paciente")
      .send({ name: "Gabriel", data_nascimento: "28/02/1998" });

    expect(resposta.body).toEqual({
      message: "Paciente criado com sucesso!",
      paciente: {
        name: "Gabriel",
        nascimento: "28/02/1998",
      },
    });
    expect(resposta.statusCode).toBe(200);
  });
  test("Deve ser capaz de criar um paciente menor de 18 anos", async () => {
    const resposta = await request(app).post("/paciente").send({
      name: "Gabriel",
      data_nascimento: "28/02/2010",
      responsavel: "Pai do Gabriel",
    });

    expect(resposta.body).toEqual({
      message: "Paciente criado com sucesso!",
      paciente: {
        name: "Gabriel",
        nascimento: "28/02/2010",
        responsavel: "Pai do Gabriel",
      },
    });
    expect(resposta.statusCode).toBe(200);
  });
  test("Não deve ser capaz de criar um paciente menor de 18 anos por causa que não foi passado o responsavel", async () => {
    const resposta = await request(app).post("/paciente").send({
      name: "Gabriel",
      data_nascimento: "28/02/2010",
    });

    expect(resposta.body).toEqual({
      message: "Responsável é obrigatório!",
    });
    expect(resposta.statusCode).toBe(400);
  });

  test("Deve ser capaz de listar os pacientes do sitema", async () => {
    await request(app)
      .post("/paciente")
      .send({ name: "Gabriel", data_nascimento: "28/02/1998" });
    await request(app)
      .post("/paciente")
      .send({ name: "João", data_nascimento: "28/02/1997" });

    const resposta = await request(app).get("/paciente");

    expect(resposta.body).toEqual({
      pacientes: [
        {
          name: "Gabriel",
          nascimento: "28/02/1998",
        },
        { name: "João", nascimento: "28/02/1997" },
      ],
    });
    expect(resposta.statusCode).toBe(200);
  });
});
