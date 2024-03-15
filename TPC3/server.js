/* 
    Name: Miguel Guimarães
    University: Universidade do Minho
    Engenharia Web 2024 / Web Engineering 2024 
*/

// Imports 
var http = require('http')
var axios = require('axios')
var url = require("url")
const { parse } = require('querystring');

// Importar outros .js
var templates = require('./templates') // Necessario criar e colocar na mesma pasta
var static = require('./static.js')    // Colocar na mesma pasta

// Criação do servidor
var alunosServer = http.createServer((req, res) => {
    var addr = url.parse(req.url, true)

    // Recebemos um pedido de recurso estático como "favicon.png", logo utilizar static.js para realizar esse pedido
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    } else{
        // Recebido um pedido HTTP  
        switch(req.method){
            case "GET": 
                //------------------------------ GET /filmes ------------------------------// 
                if(req.url == '/'){
                    axios.get('http://localhost:3000/') // Obter os dados apartir do json-server
                        res.writeHead(520, {'Content-Type': 'text/html'})  // Indicar ao cliente que o conteudo enviado a seguir é html
                        res.end(templates.paginaInicial()) // Enviar o html para o cliente visualizar o conteudo (Html construido pelo template)
                } else if(req.url == '/filmes' || req.url == "/"){ // Recebido pedido de página de filmes ou página inicial
                    axios.get('http://localhost:3000/filmes') // Obter os dados apartir do json-server
                        .then(response => {
                            res.writeHead(520, {'Content-Type': 'text/html'})  // Indicar ao cliente que o conteudo enviado a seguir é html
                            res.end(templates.paginaFilmes(response.data)) // Enviar o html para o cliente visualizar o conteudo (Html construido pelo template)
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html'})
                            res.end(templates.errorPage(erro,d))
                        })
                } else if (/filmes\/([\da-zA-Z]){24}/.test(req.url)){ // Recebido pedido página de um filme individual
                    axios.get("http://localhost:3000" +  addr.path) // Obter os dados apartir do json-server
                        .then(response => {
                            res.writeHead(520, {'Content-Type': 'text/html'})  // Indicar ao cliente que o conteudo enviado a seguir é html
                            res.end(templates.filmeId(response.data)) // Enviar o html para o cliente visualizar o conteudo (Html construido pelo template)
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html'})
                            res.end(templates.errorPage(erro,d))
                        })
                } else if (/atores\/\d/.test(req.url)){ // Recebido pedido página de visualização de um ator especifico
                    axios.get("http://localhost:3000" + addr.path) // Obter os dados apartir do json-server
                        .then(response => {
                            res.writeHead(520, {'Content-Type': 'text/html'})  // Indicar ao cliente que o conteudo enviado a seguir é html
                            res.end(templates.paginaAtorInd(response.data)) // Enviar o html para o cliente visualizar o conteudo (Html construido pelo template)
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html'})
                            res.end(templates.errorPage(erro,d))
                        })          
                } else if (/generos\/\d/.test(req.url)){ // Recebido pedido página de visualização de um genero especifico
                    axios.get("http://localhost:3000" + addr.path) // Obter os dados apartir do json-server
                        .then(response => {
                            res.writeHead(520, {'Content-Type': 'text/html'})  // Indicar ao cliente que o conteudo enviado a seguir é html
                            res.end(templates.paginaGeneroInd(response.data)) // Enviar o html para o cliente visualizar o conteudo (Html construido pelo template)
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html'})
                            res.end(templates.errorPage(erro,d))
                        })    
                } else if (/atores/.test(req.url)){ // Recebido pedido página de visualização dos atores
                    axios.get("http://localhost:3000" +  addr.path) // Obter os dados apartir do json-server
                        .then(response => {
                            res.writeHead(520, {'Content-Type': 'text/html'})  // Indicar ao cliente que o conteudo enviado a seguir é html
                            res.end(templates.paginaAtores(response.data)) // Enviar o html para o cliente visualizar o conteudo (Html construido pelo template)
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html'})
                            res.end(templates.errorPage(erro,d))
                        })
                } else if (/generos/.test(req.url)){ // Recebido pedido página de visualização dos generos
                    axios.get("http://localhost:3000" +  addr.path) // Obter os dados apartir do json-server
                        .then(response => {
                            res.writeHead(520, {'Content-Type': 'text/html'})  // Indicar ao cliente que o conteudo enviado a seguir é html
                            res.end(templates.paginaGeneros(response.data)) // Enviar o html para o cliente visualizar o conteudo (Html construido pelo template)
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html'})
                            res.end(templates.errorPage(erro,d))
                        })    
                } else {
                    res.end(templates.unknownPage())
                }
                break;
            default: 
                break;
            }
        }
    }
)

alunosServer.listen(7777, ()=>{
    console.log("Servidor à escuta na porta 7777...")
})



