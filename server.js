"use strict";
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const arquivos = {
  "/": ["index.html", "text/html; charset=utf-8"],
  "/index.html": ["index.html", "text/html; charset=utf-8"],
  "/aluno.js": ["aluno.js", "text/javascript; charset=utf-8"],
  "/app.js": ["app.js", "text/javascript; charset=utf-8"]
};
http.createServer((req, res) => {
  const arquivo = arquivos[new URL(req.url, "http://localhost").pathname];
  if (!arquivo) { res.writeHead(404); res.end("Não encontrado"); return; }
  fs.readFile(path.join(__dirname, arquivo[0]), (erro, dados) => {
    if (erro) { res.writeHead(500); res.end("Erro ao ler arquivo"); return; }
    res.writeHead(200, { "Content-Type": arquivo[1], "Cache-Control": "no-store" });
    res.end(dados);
  });
}).listen(8080, "0.0.0.0", () => console.log("Aplicação disponível em http://localhost:8080"));
