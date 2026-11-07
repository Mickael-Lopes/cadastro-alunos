"use strict";

const CURSOS = ["JavaScript", "Python", "Java"];

class Aluno {
  constructor(nome, idade, curso, notaFinal) {
    if (typeof nome !== "string" || !nome.trim()) {
      throw new Error("Informe o nome do aluno.");
    }
    if (!Number.isInteger(idade) || idade < 1 || idade > 120) {
      throw new Error("Informe uma idade inteira entre 1 e 120.");
    }
    if (!CURSOS.includes(curso)) throw new Error("Selecione um curso válido.");
    if (!Number.isFinite(notaFinal) || notaFinal < 0 || notaFinal > 10) {
      throw new Error("Informe uma nota entre 0 e 10.");
    }
    this.nome = nome.trim();
    this.idade = idade;
    this.curso = curso;
    this.notaFinal = notaFinal;
  }

  isAprovado() {
    return this.notaFinal >= 7;
  }

  toString() {
    return `${this.nome} — ${this.idade} anos — ${this.curso} — Nota: ${this.notaFinal.toLocaleString("pt-BR")} — ${this.isAprovado() ? "Aprovado" : "Reprovado"}`;
  }
}

// Arrow functions e métodos de arrays pedidos no exercício 4.
const gerarRelatorios = (alunos) => ({
  aprovados: alunos.filter((aluno) => aluno.isAprovado()),
  mediaNotas: alunos.length ? alunos.reduce((soma, aluno) => soma + aluno.notaFinal, 0) / alunos.length : null,
  mediaIdades: alunos.length ? alunos.reduce((soma, aluno) => soma + aluno.idade, 0) / alunos.length : null,
  nomes: alunos.map((aluno) => aluno.nome).sort((a, b) => a.localeCompare(b, "pt-BR")),
  quantidadeCursos: alunos.reduce((quantidades, aluno) => {
    quantidades[aluno.curso] += 1;
    return quantidades;
  }, Object.fromEntries(CURSOS.map((curso) => [curso, 0])))
});

// Permite testar a mesma lógica no Node, sem dependências.
if (typeof module !== "undefined") module.exports = { Aluno, gerarRelatorios };
