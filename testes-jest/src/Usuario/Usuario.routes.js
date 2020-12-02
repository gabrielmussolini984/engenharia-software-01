const { Router } = require("express");
const eIgual = require("./utils/eIgual");
const app = new Router();

const usuarios = [];
const rotas = []

app.post("/auth", (req, res) => {
  const usuario = usuarios.find((usuario) => usuario.email == req.body.email);
  if (!usuario) return res.status(401).json({ message: "Email ou senha incorretos" });

  if (usuario.senha !== req.body.senha)
    return res.status(401).json({ message: "Email ou senha incorretos" });
  return res.json({ usuario });
});

app.get("/usuario/:email", (req, res) => {
  console.log(usuarios);
  const usuario = usuarios.find((usuario) => usuario.email == req.params.email);
  if (!usuario)
    return res.status(404).json({ message: "Email não encontrado!" });
  return res.json({
    usuario,
  });
});

app.post("/usuario", (req, res) => {
  if (
    !req.body ||
    !req.body.name ||
    !req.body.senha ||
    !req.body.repetir_senha ||
    !req.body.email ||
    !req.body.cpf ||
    !req.body.login
  )
    return res
      .status(400)
      .json({ message: "Faltando parâmetros obrigatórios!" });

  const emailExist = usuarios.find(
    (usuario) => usuario.email == req.body.email
  );
  const cpfExist = usuarios.find((usuario) => usuario.cpf == req.body.cpf);

  if (emailExist || cpfExist)
    return res
      .status(400)
      .json({ message: "Usuário já existe na base de dados!" });

  if (!eIgual(req.body.senha, req.body.repetir_senha))
    return res
      .status(400)
      .json({ message: "Senha não condiz com a repetição!" });

  const usuario = {
    name: req.body.name,
    cpf: req.body.cpf,
    email: req.body.email,
    login: req.body.login,
    senha: req.body.senha,
    pontos: 0,
  };
  usuarios.push(usuario);

  return res
    .status(200)
    .json({ message: "Usuário criado com sucesso!", usuario });
});

app.put("/usuario/:email", (req, res) => {
  const indice = usuarios
    .map((e) => {
      console.log(e)
      return e.email;
    })
    .indexOf(req.params.email);
  if (indice == -1) return res.status(400).json({message: "Usuario não existente"})
  if (usuarios[indice].senha != req.body.senha_atual) return res.status(400).json({message: "Senha atual inválida"})
  usuarios[indice].email = req.body.email;
  usuarios[indice].senha = req.body.senha_nova;
  return res.json({
    usuario: usuarios[indice],
  });
});

app.delete("/usuario/:email", (req, res) => {
  const indice = usuarios
    .map((e) => {
      return e.email;
    })
    .indexOf(req.params.email);
  usuarios.splice(indice, 1);
  console.log(usuarios);
  return res.json({
    message: "Usuário deletado com sucesso!",
  });
});



app.get("/rota/:email", (req, res) => {
  const rota = rotas.find((rota) => rota.email == req.params.email);
  if (!rota)
    return res.status(404).json({ message: "Rota não encontrado!" });
  return res.json({
    rota
  });
});

app.post("/rota", (req, res) => {
  console.log(req.body)
  const {endereco_atual, endereco_destino,email} = req.body;
  rotas.push(email, endereco_atual, endereco_destino)
  const rota = {email, endereco_atual, endereco_destino}
  console.log(rota)
  return res.json({
    rota
  });
});
app.put("/rota/:email", (req, res) => {
  const {email} = req.params;
  const {endereco_atual, endereco_destino} = req.body;
  const indice = rotas
    .map((e) => {
      return e.email;
    })
    .indexOf(req.params.email);
  rotas[indice] = {email, endereco_atual, endereco_destino}

  return res.json({
    rota: rotas[indice],
  });
});

app.delete("/rota/:email", (req, res) => {
  const indice = rotas
    .map((e) => {
      return e.email;
    })
    .indexOf(req.params.email);
  rotas.splice(indice, 1);
  return res.json({
    message: "Rota deletada com sucesso!",
  });
});

module.exports = { app,usuarios };
