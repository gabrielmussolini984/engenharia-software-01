module.exports = (nascimento) => {
  const partesData = nascimento.split("/");

  const dataNascimento = new Date(partesData[2], partesData[1] - 1, partesData[0]);
  if (dataNascimento == 'Invalid Date') return "DATA INVALIDA"
  const dataAtual = new Date()

  const idade = Math.floor((dataAtual-dataNascimento) / (365.25 * 24 * 60 * 60 * 1000));

  if (idade >= 18) return true;

  return false;
}