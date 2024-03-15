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

//////////////////////////////////////////// Criação do servidor ////////////////////////////////////////////
var alunosServer = http.createServer((req, res) => {
    var addr = url.parse(req.url, true)

    // Recebemos um pedido de recurso estático como "favicon.png", logo utilizar static.js para realizar esse pedido
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    } else{
        // Recebido um pedido HTTP  
        switch(req.method){
            case "GET": //--------------------------------------------------------------------> GET
                //////////////////////////////////////////////////////////////////////
                if (req.url == '/') {
                    axios.get('http://localhost:3000/') 
                        res.writeHead(520, {'Content-Type': 'text/html'})  
                        res.end(templates.paginaInicial()) 
                }
                //////////////////////////////////////////////////////////////////////
                else if (req.url == '/compositores') { 
                    axios.get('http://localhost:3000/compositores') 
                        .then(function(response) {
                            res.writeHead(520, {'Content-Type': 'text/html'})  
                            res.end(templates.paginaCompositores(response.data)) 
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html'})
                            res.end(templates.errorPage(erro))
                        })
                }
                //////////////////////////////////////////////////////////////////////
                else if (/compositores\/C\d+/.test(req.url)) { 
                    axios.get('http://localhost:3000' + addr.path) 
                        .then(function(response) {
                            res.writeHead(520, {'Content-Type': 'text/html'})  
                            res.end(templates.paginaCompositor(response.data))
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html'})
                            res.end(templates.errorPage(erro))
                        })
                }
                //////////////////////////////////////////////////////////////////////
                else {
                    res.end(templates.unknownPage())
                }
                break;
            case "POST": //--------------------------------------------------------------------> POST
                break;
            case "PUT": //--------------------------------------------------------------------> PUT
                break;
            case "DELETE": //--------------------------------------------------------------------> DELETE
                break;
            default: 
                break;
            }
        }
    }
)

// Criar servidor
alunosServer.listen(7777, ()=>{
    console.log("Servidor à escuta na porta 7777...")
})



