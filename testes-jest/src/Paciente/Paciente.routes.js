const { Router } = require("express");
const eMaior = require("./utils/eMaior");
const app = new Router();

const pacientes = [];

app.get("/paciente", (req, res) => {
  return res.json({
    pacientes,
  })
})

app.post("/paciente", (req, res) => {
  if (!req.body || !req.body.name || !req.body.data_nascimento)
    return res.status(400).json({ message: "Faltando parâmetros!" });

  const eMaiorDeIdade = eMaior(req.body.data_nascimento);

  const paciente = {
    name: req.body.name,
    nascimento: req.body.data_nascimento,
  };

  if (!eMaiorDeIdade) {
    if (!req.body.responsavel)
      return res.status(400).json({ message: "Responsável é obrigatório!" });
    paciente.responsavel = req.body.responsavel;
  }

  pacientes.push(paciente);

  return res
    .status(200)
    .json({ message: "Paciente criado com sucesso!", paciente });
});

module.exports = app;
