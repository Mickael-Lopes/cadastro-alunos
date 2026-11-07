# DevTech Academy — Cadastro de alunos

Implementação dos quatro exercícios da atividade EC01, em HTML e JavaScript puro, sem CSS e sem dependências npm.

## Executar no VS Code

Abra esta pasta no VS Code. Para usar o ambiente de desenvolvimento solicitado na atividade, instale e inicie o Docker Desktop e execute no terminal integrado:

```sh
docker compose up --build
```

Acesse http://localhost:8080. Os arquivos locais são montados no container; depois de editar HTML ou JavaScript no VS Code, basta atualizar a página. Para encerrar, pressione Ctrl+C e execute `docker compose down`. As mesmas operações estão em **Terminal > Executar Tarefa**.

Alternativa para conferir sem Docker: abra `index.html` no navegador ou execute `npm start` com Node.js instalado. Essa alternativa não substitui o requisito de desenvolvimento em container.

## O que foi implementado

1. **CRUD:** formulário com nome, idade, curso (JavaScript, Python, Java) e nota final; tabela com edição e exclusão; array `alunos` em memória, em `app.js`.
2. **Orientação a objetos:** classe `Aluno` em `aluno.js`, com os quatro atributos, construtor, `isAprovado()` (nota >= 7) e `toString()`.
3. **Eventos:** `addEventListener` e funções anônimas para envio do formulário, cancelamento e cliques delegados na tabela. O envio aceita clique e Enter. Arrow functions manipulam os dados; as operações exibem mensagens na página e no console. A versão final usa os escutadores solicitados no exercício 3 em lugar do `onclick` introdutório do exercício 1.
4. **Relatórios:** `filter` lista aprovados, `reduce` calcula médias e contagens, `map` extrai nomes, `sort` ordena em português e `forEach` renderiza os registros. Todos se atualizam após alterações.

Validações adotadas: nome obrigatório, idade inteira entre 1 e 120, curso válido e nota entre 0 e 10. Não há banco de dados nem localStorage: atualizar a página apaga os registros, conforme o armazenamento em memória solicitado.

## Verificação

```sh
npm test
# Ou dentro do container:
docker compose run --rm alunos npm test
```

Os testes verificam a nota de corte, validações, médias, ordenação, contagens e lista vazia. Para conferir a interface, cadastre alunos, edite nome/curso/nota, cancele uma edição e exclua registros; acompanhe a tabela e os relatórios.

## Compartilhar no GitHub

Depois de autenticar sua conta, crie um repositório vazio no GitHub e conecte-o (substitua a URL abaixo pela sua):

```sh
git remote add origin https://github.com/SEU-USUARIO/cadastro-alunos.git
git push -u origin main
```

Caso ainda não haja commit local, configure sua identidade Git e execute `git add .` e `git commit -m "Implementa atividade EC01 de cadastro de alunos"` antes do push. A publicação depende de uma conta autenticada e de um repositório de destino.
