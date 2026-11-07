const { test } = require("node:test");
const assert = require("node:assert/strict");
const { Aluno, gerarRelatorios } = require("../aluno.js");

test("aprovação inclui a nota 7 e representação contém os dados", () => {
  const aluno = new Aluno(" Ana ", 20, "Java", 7);
  assert.equal(aluno.nome, "Ana");
  assert.equal(aluno.isAprovado(), true);
  assert.equal(new Aluno("Bia", 19, "Python", 6.99).isAprovado(), false);
  for (const trecho of ["Ana", "20", "Java", "7", "Aprovado"]) assert.ok(aluno.toString().includes(trecho));
});

test("relatórios calculam médias, aprovação, ordem e quantidade sem reordenar o cadastro", () => {
  const alunos = [new Aluno("Zeca", 30, "Java", 6), new Aluno("Ana", 20, "Python", 8), new Aluno("Bia", 10, "Java", 7)];
  const resultado = gerarRelatorios(alunos);
  assert.deepEqual(resultado.aprovados.map(a => a.nome), ["Ana", "Bia"]);
  assert.equal(resultado.mediaNotas, 7);
  assert.equal(resultado.mediaIdades, 20);
  assert.deepEqual(resultado.nomes, ["Ana", "Bia", "Zeca"]);
  assert.deepEqual(resultado.quantidadeCursos, { JavaScript: 0, Python: 1, Java: 2 });
  assert.equal(alunos[0].nome, "Zeca");
  alunos[0] = new Aluno("Zeca", 30, "JavaScript", 9);
  assert.equal(gerarRelatorios(alunos).aprovados.length, 3);
  alunos.splice(1, 1);
  assert.equal(gerarRelatorios(alunos).quantidadeCursos.Python, 0);
});

test("lista vazia não produz médias inválidas", () => {
  const resultado = gerarRelatorios([]);
  assert.equal(resultado.mediaNotas, null);
  assert.equal(resultado.mediaIdades, null);
  assert.deepEqual(resultado.nomes, []);
  assert.deepEqual(resultado.aprovados, []);
});

test("rejeita nome vazio, idade inválida, curso desconhecido e notas inválidas", () => {
  for (const dados of [[" ",20,"Java",7],["Ana",1.5,"Java",7],["Ana",0,"Java",7],["Ana",20,"C++",7],["Ana",20,"Java",11],["Ana",20,"Java",NaN]]) {
    assert.throws(() => new Aluno(...dados));
  }
  assert.equal(new Aluno("Ana", 20, "Java", 0).notaFinal, 0);
});
