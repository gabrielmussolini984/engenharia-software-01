const eMaior = require('../../src/Paciente/utils/eMaior');

describe("Testar a função eMaior.", () => {
  test("Deve retornar que é menor de idade", async () => {
    expect(eMaior('28/02/2010')).toBe(false);
  });
  test("Deve retornar que é maior de idade", async () => {
    expect(eMaior('28/02/1998')).toBe(true);
  });
  test("Deve retornar uma mensagem de erro", async () => {
    expect(eMaior('shadaushduash')).toBe("DATA INVALIDA");
  });
});