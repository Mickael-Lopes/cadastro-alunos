"use strict";

// Armazenamento exclusivamente em memória: array de instâncias de Aluno.
const alunos = [];
let alunoEmEdicao = null;
const formulario = document.getElementById("formulario");
const tabela = document.getElementById("lista-alunos");
const botaoSalvar = document.getElementById("salvar");
const botaoCancelar = document.getElementById("cancelar");
const campo = (nome) => formulario.elements.namedItem(nome);

const informar = (texto) => {
  document.getElementById("mensagem").textContent = texto;
  console.log(texto);
};

const limparFormulario = () => {
  alunoEmEdicao = null;
  formulario.reset();
  botaoSalvar.textContent = "Cadastrar";
  botaoCancelar.hidden = true;
  document.getElementById("titulo-formulario").textContent = "Cadastrar aluno";
};

const preencherLista = (id, valores, vazio) => {
  const lista = document.getElementById(id);
  lista.replaceChildren();
  (valores.length ? valores : [vazio]).forEach((valor) => {
    const item = document.createElement("li");
    item.textContent = valor;
    lista.append(item);
  });
};

const renderizar = () => {
  tabela.replaceChildren();
  alunos.forEach((aluno, indice) => {
    const linha = document.createElement("tr");
    [aluno.nome, aluno.idade, aluno.curso, aluno.notaFinal.toLocaleString("pt-BR"), aluno.isAprovado() ? "Aprovado" : "Reprovado"].forEach((valor) => {
      const celula = document.createElement("td");
      celula.textContent = valor;
      linha.append(celula);
    });
    const acoes = document.createElement("td");
    ["Editar", "Excluir"].forEach((acao) => {
      const botao = document.createElement("button");
      botao.type = "button";
      botao.textContent = acao;
      botao.dataset.acao = acao;
      botao.dataset.indice = indice;
      botao.setAttribute("aria-label", `${acao} ${aluno.nome}`);
      acoes.append(botao, " ");
    });
    linha.append(acoes);
    tabela.append(linha);
  });
  if (!alunos.length) {
    const linha = tabela.insertRow();
    const celula = linha.insertCell();
    celula.colSpan = 6;
    celula.textContent = "Nenhum aluno cadastrado.";
  }
  const relatorios = gerarRelatorios(alunos);
  preencherLista("aprovados", relatorios.aprovados.map((aluno) => aluno.toString()), "Nenhum aluno aprovado.");
  preencherLista("nomes", relatorios.nomes, "Nenhum aluno cadastrado.");
  preencherLista("quantidade-cursos", Object.entries(relatorios.quantidadeCursos).map(([curso, quantidade]) => `${curso}: ${quantidade}`));
  const formatarMedia = (valor) => valor === null ? "Sem alunos cadastrados" : valor.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  document.getElementById("media-notas").textContent = formatarMedia(relatorios.mediaNotas);
  document.getElementById("media-idades").textContent = formatarMedia(relatorios.mediaIdades);
};

// Submit atende tanto ao clique em Cadastrar quanto à tecla Enter.
formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();
  if (!formulario.reportValidity()) return;
  try {
    const aluno = new Aluno(campo("nome").value, campo("idade").valueAsNumber, campo("curso").value, campo("notaFinal").valueAsNumber);
    if (alunoEmEdicao === null) {
      alunos.push(aluno);
      informar(`Aluno ${aluno.nome} cadastrado com sucesso.`);
    } else {
      alunos[alunos.indexOf(alunoEmEdicao)] = aluno;
      informar(`Aluno ${aluno.nome} editado com sucesso.`);
    }
    limparFormulario();
    renderizar();
    campo("nome").focus();
  } catch (erro) {
    informar(erro.message);
  }
});

// Delegação mantém o evento nos botões criados dinamicamente na tabela.
tabela.addEventListener("click", function (evento) {
  const botao = evento.target.closest("button[data-acao]");
  if (!botao || !tabela.contains(botao)) return;
  const indice = Number(botao.dataset.indice);
  const aluno = alunos[indice];
  if (botao.dataset.acao === "Editar") {
    alunoEmEdicao = aluno;
    ["nome", "idade", "curso", "notaFinal"].forEach((nome) => { campo(nome).value = aluno[nome]; });
    botaoSalvar.textContent = "Salvar alterações";
    botaoCancelar.hidden = false;
    document.getElementById("titulo-formulario").textContent = "Editar aluno";
    informar(`Editando ${aluno.nome}.`);
    campo("nome").focus();
  } else {
    alunos.splice(indice, 1);
    if (alunoEmEdicao === aluno) limparFormulario();
    renderizar();
    informar(`Aluno ${aluno.nome} excluído com sucesso.`);
  }
});

botaoCancelar.addEventListener("click", function () {
  limparFormulario();
  informar("Edição cancelada.");
});

renderizar();
