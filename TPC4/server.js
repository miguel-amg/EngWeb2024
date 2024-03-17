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

// Obtem todos os compositores de um periodo
function obterCompositoresPeriodo(periodo){
    return axios.get("http://localhost:3000/compositores?periodo=" + periodo)
        .then(function(response){
            return response.data;
        })
        .catch(function(erro){
            throw erro;
        });
}

// Aux functions
function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    } else {
        callback(null);
    }
}

//////////////////////////////////////////// Criação do servidor ////////////////////////////////////////////
var alunosServer = http.createServer((req, res) => {
    var addr = url.parse(req.url, true)

    // Recebemos um pedido de recurso estático como "favicon.png", logo utilizar static.js para realizar esse pedido
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    } else {
        // Recebido um pedido HTTP  
        switch(req.method){
            case "GET": //--------------------------------------------------------------------> GET
                //////////////////////////////////////////////////////////// PAGINA INICIAL
                if (req.url == '/') {
                    axios.get('http://localhost:3000/') 
                        res.writeHead(520, {'Content-Type': 'text/html'})  
                        res.end(templates.paginaInicial()) 
                }
                //////////////////////////////////////////////////////////// COMPOSITORES
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
                //////////////////////////////////////////////////////////// COMPOSITORES/ID
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
                //////////////////////////////////////////////////////////// PERIODOS
                else if (req.url == '/periodos') { 
                    axios.get('http://localhost:3000/periodos') 
                        .then(function(response) {
                            res.writeHead(520, {'Content-Type': 'text/html'})  
                            res.end(templates.paginaPeriodos(response.data))
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html'})
                            res.end(templates.errorPage(erro))
                        })
                }
                //////////////////////////////////////////////////////////// PERIODOS/ID
                else if (/periodos\/\d+/.test(req.url)) { 
                    var id = req.url.split("/")[2];
                    axios.get('http://localhost:3000' + addr.path) 
                        .then(function(response) {
                            obterCompositoresPeriodo(response.data['periodo'])
                                .then(function(compositores) {
                                    res.writeHead(520, {'Content-Type': 'text/html'});  
                                    res.end(templates.paginaPeriodo(response.data, compositores));
                                })
                                .catch(function(erro) {
                                    res.writeHead(200, {'Content-Type': 'text/html'});
                                    res.end(templates.errorPage(erro));
                                });
                        })
                        .catch(function(erro) {
                            res.writeHead(200, {'Content-Type': 'text/html'});
                            res.end(templates.errorPage(erro));
                        });
                }
                //////////////////////////////////////////////////////////// COMPOSITORES?PERIODO={PERIODO}
                else if (/compositores\?periodo=([a-zA-Z])*/.test(req.url)) { 
                    const periodoId = req.url.match(/compositores\?periodo=([a-zA-Z]+)/)[1];

                    axios.get('http://localhost:3000' + addr.path) 
                        .then(function(response) {
                            res.writeHead(520, {'Content-Type': 'text/html'})  
                            res.end(templates.paginaPeriodoExp(response.data, periodoId))
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html'})
                            res.end(templates.errorPage(erro))
                        })
                }
                //////////////////////////////////////////////////////////// DELETE COMPOSITOR (/compositores/delete/${dado.id})
                else if (/compositores\/delete\/C\d+/.test(req.url)) { 
                    var id = req.url.split("/")[3]
                    axios.delete('http://localhost:3000/compositores/' + id)
                    .then(function(response) {
                        res.writeHead(520, {'Content-Type': 'text/html'})  
                        res.end(templates.paginaCompositorDelete(response.data)) 
                    })
                    .catch(function(erro){
                        res.writeHead(200, {'Content-Type': 'text/html'})
                        res.end(templates.errorPage(erro))
                    })
                }
                //////////////////////////////////////////////////////////// DELETE PERIODO (/periodo/delete/${dado.id})
                else if (/periodos\/delete\/\d+/.test(req.url)) { 
                    var id = req.url.split("/")[3]
                    axios.delete('http://localhost:3000/periodos/' + id)
                    .then(function(response) {
                        res.writeHead(520, {'Content-Type': 'text/html'})  
                        res.end(templates.paginaPeriodoDelete(response.data)) 
                    })
                    .catch(function(erro){
                        res.writeHead(200, {'Content-Type': 'text/html'})
                        res.end(templates.errorPage(erro))
                    })
                }
                //////////////////////////////////////////////////////////// EDIT COMPOSITOR (/compositores/edit/${dado.id})
                else if (/compositores\/edit\/C\d+/.test(req.url)) { 
                    var id = req.url.split("/")[3]
                    axios.get('http://localhost:3000/compositores/' + id)
                    .then(function(response) {
                        res.writeHead(520, {'Content-Type': 'text/html'})  
                        res.end(templates.paginaCompositorEdit(response.data)) 
                    })
                    .catch(function(erro){
                        res.writeHead(200, {'Content-Type': 'text/html'})
                        res.end(templates.errorPage(erro))
                    })
                }
                //////////////////////////////////////////////////////////// ADD COMPOSITOR
                else if (req.url == '/compositores/add') { 
                    res.writeHead(520, {'Content-Type': 'text/html'})  
                    res.end(templates.paginaCompositorAdd()) 
                }
                //////////////////////////////////////////////////////////// EDIT PERIODO (/periodos/edit/${dado.id})
                else if (/periodos\/edit\/\d+/.test(req.url)) { 
                    var id = req.url.split("/")[3]
                    axios.get('http://localhost:3000/periodos/' + id)
                    .then(function(response) {
                        res.writeHead(520, {'Content-Type': 'text/html'})  
                        res.end(templates.paginaPeriodoEdit(response.data)) 
                    })
                    .catch(function(erro){
                        res.writeHead(200, {'Content-Type': 'text/html'})
                        res.end(templates.errorPage(erro))
                    })
                }
                //////////////////////////////////////////////////////////// ADD COMPOSITOR
                else if (req.url == '/periodos/add') { 
                    res.writeHead(520, {'Content-Type': 'text/html'})  
                    res.end(templates.paginaPeriodoAdd()) 
                }
                ////////////////////////////////////////////////////////////////////// ERROR
                else {
                    res.end(templates.unknownPage())
                }
                break;

            case "POST": //--------------------------------------------------------------------> POST
                //////////////////////////////////////////////////////////// EDIT COMPOSITOR (/compositor/edit/${dado.id})
                if (/compositores\/edit\/C\d+/.test(req.url)) {
                    var id = req.url.split("/")[3];
                    // Coleta os dados do corpo da requisição
                    collectRequestBodyData(req, function(result) {
                        if (result) {
                            // Faz o pedido de edição com os dados coletados
                            axios.put("http://localhost:3000/compositores/" + id, result)
                                .then(response => {
                                    res.writeHead(201, {"Content-Type": "text/html"});
                                    res.write(templates.paginaCompositor(response.data));
                                    res.end();
                                })
                                .catch(function(erro) {
                                    res.writeHead(520, {"Content-Type": "text/html"});
                                    res.write(templates.errorPage(erro));
                                    res.end();
                                });
                        } else {
                            res.writeHead(201, {"Content-Type": "text/html"});
                            res.write("<p> Unable to collect data from body </p>");
                            res.end();
                        }
                    });
                //////////////////////////////////////////////////////////// EDIT PERIODO (/periodos/edit/${dado.id})
                } else if (/periodos\/edit\/\d+/.test(req.url)) {
                    var id = req.url.split("/")[3];
                    // Coleta os dados do corpo da requisição
                    collectRequestBodyData(req, function(result) {
                        if (result) {
                            // Faz o pedido de edição com os dados coletados
                            axios.put("http://localhost:3000/periodos/" + id, result)
                                .then(response => {
                                    obterCompositoresPeriodo(response.data['periodo'])
                                    .then(function(compositores) {
                                        res.writeHead(520, {'Content-Type': 'text/html'});  
                                        res.end(templates.paginaPeriodo(response.data, compositores));
                                    })
                                    .catch(function(erro) {
                                        res.writeHead(200, {'Content-Type': 'text/html'});
                                        res.end(templates.errorPage(erro));
                                    });
                                })
                                .catch(function(erro) {
                                    res.writeHead(520, {"Content-Type": "text/html"});
                                    res.write(templates.errorPage(erro));
                                    res.end();
                                });
                        } else {
                            res.writeHead(201, {"Content-Type": "text/html"});
                            res.write("<p> Unable to collect data from body </p>");
                            res.end();
                        }
                    });
                }
                //////////////////////////////////////////////////////////// ADD COMPOSITOR
                else if(req.url == "/compositores/add"){
                    collectRequestBodyData(req,result =>{
                        if(result){
                            axios.post("http://localhost:3000/compositores", result)
                            .then(response =>{
                                res.writeHead(201,{"Content-Type": "text/html"})
                                res.write(templates.paginaCompositor(response.data))
                                res.end()
                            })
                            .catch(erro => {
                                res.writeHead(520,{"Content-Type": "text/html"})
                                res.write(templates.errorPage(erro))
                                res.end()
                            })
                        } else {
                            res.writeHead(201,{"Content-Type":"text/html"})
                            res.write("<p> Unable to collect data from body </p>")
                        }
                    })
                }
                //////////////////////////////////////////////////////////// ADD PERIODO
                else if(req.url == "/periodos/add"){
                    collectRequestBodyData(req,result =>{
                        if(result){
                            axios.post("http://localhost:3000/periodos", result)
                            .then(response =>{
                                obterCompositoresPeriodo(response.data['periodo'])
                                .then(function(compositores) {
                                    res.writeHead(520, {'Content-Type': 'text/html'});  
                                    res.end(templates.paginaPeriodo(response.data, compositores));
                                })
                                .catch(function(erro) {
                                    res.writeHead(200, {'Content-Type': 'text/html'});
                                    res.end(templates.errorPage(erro));
                                });
                            })
                            .catch(erro => {
                                res.writeHead(520,{"Content-Type": "text/html"})
                                res.write(templates.errorPage(erro))
                                res.end()
                            })
                        } else {
                            res.writeHead(201,{"Content-Type":"text/html"})
                            res.write("<p> Unable to collect data from body </p>")
                        }
                    })
                }
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
alunosServer.listen(9090, ()=>{
    console.log("Servidor à escuta na porta 9090.")
})



