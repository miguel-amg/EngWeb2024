var http = require("http");
var fs = require("fs");
var url = require("url");
var axios = require("axios");

http.createServer(function(req, res) {
    // Construtor de regex em js
    var regex = /^\/c\d+$/;
    var q = url.parse(req.url, true); // Obter o URL

    if (q.pathname == '/') {
        // Página principal - serve o arquivo index.html
        fs.readFile("index.html", function(err, data) {
            if (err) {
                console.error("Erro ao ler o arquivo:", err);
                res.writeHead(500, { "Content-Type": "text/html; charset=utf-8" });
                res.end("<p>Erro interno do servidor ao ler o arquivo.</p>");
            } else {
                res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
                res.end(data || ""); // Garante que data não seja undefined
            }
        });
    } else if (regex.test(q.pathname)) {
        // Páginas correspondentes ao regex
        fs.readFile("pags/" + q.pathname.substring(1) + ".html", function(err, data) {
            if (err) {
                console.error("Erro ao ler o arquivo:", err);
                res.writeHead(500, { "Content-Type": "text/html; charset=utf-8" });
                res.end("<p>Erro interno do servidor ao ler o arquivo.</p>");
            } else {
                res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
                res.end(data || ""); // Garante que data não seja undefined
            }
        });
    } else if (q.pathname == "/w3.css") {
        // Arquivo CSS
        fs.readFile("w3.css", function(err, data) {
            if (err) {
                console.error("Erro ao ler o arquivo:", err);
                res.writeHead(500, { "Content-Type": "text/html; charset=utf-8" });
                res.end("<p>Erro interno do servidor ao ler o arquivo.</p>");
            } else {
                res.writeHead(200, { "Content-Type": "text/css" });
                res.end(data || ""); // Garante que data não seja undefined
            }
        });
    } else {
        // Bad request=400 serviço não suportado
        res.writeHead(400, { "Content-Type": "text/html; charset=utf-8" });
        res.end("<p>Erro: pedido não suportado.</p><pre>Caminho:" + q.pathname + "</pre>");
    }

    console.log(q.pathname);
}).listen(7777);

console.log("Sucesso!");
