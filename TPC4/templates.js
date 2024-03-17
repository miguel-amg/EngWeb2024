////////////////////////////////////////////// Página dos compositores //////////////////////////////////////////////
exports.paginaInicial = function(){
    var pagHTML = `
    <html>
        <head>
            <title>Página Inicial</title>
            <meta charset="utf-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
        </head>

        <body class="w3-blue">
            <header class="w3-container w3-blue">
                <h1><b>Página inicial</b></h1>
            </header>

            <a href="/compositores" style="text-decoration:none"> <button class="w3-button w3-block w3-light-blue"><h2> Compositores </h2></button> </a>
            <a href="/periodos" style="text-decoration:none"> <button class="w3-button w3-block w3-light-blue"><h2> Periodos </h2></button> </a>
            <a href="/compositores/add" style="text-decoration:none"> <button class="w3-button w3-block w3-light-blue"><h2> Adicionar Compositor </h2></button> </a>
            <a href="/periodos/add" style="text-decoration:none"> <button class="w3-button w3-block w3-light-blue"><h2> Adicionar Periodo </h2></button> </a>

            <footer class="w3-container w3-blue">
            <address> Miguel Guimarães (Web Engineering 2024) </address>
            </footer>
        </body>
    </html>
    `

    return pagHTML
}

////////////////////////////////////////////// Página dos compositores //////////////////////////////////////////////
exports.paginaCompositores = function(dados){
    var pagHTML = `
    <html>
    <head>
        <title>Compositores</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
    
    <div class="w3-bar w3-black">
        <a href="/" class="w3-bar-item w3-button">Inicio</a>
        <a href="/compositores" class="w3-bar-item w3-button">Compositores</a>
        <a href="/periodos" class="w3-bar-item w3-button">Periodos</a>
        <a href="/compositores/add" class="w3-bar-item w3-button">Add Compositor</a>
        <a href="/periodos/add" class="w3-bar-item w3-button">Add Periodo</a>
    </div>

    <div class="w3-card-4">
            <header class="w3-container w3-blue">
                <h1>Compositores</h1>
            </header>
        
            <table class="w3-table-all w3-light-blue">
                <tr class="w3-blue">
                    <th>Nome</th>
                    <th>Ações</th>
                </tr>
        `

        for (let dado of dados) {
                pagHTML += `<tr class="w3-light-blue">
                <td> <a href="/compositores/${dado.id}" style="text-decoration:none"><i><h4>${dado.nome}</h4></i></a></td>
                <td>
                    <a href="/compositores/edit/${dado.id}" style="text-decoration:none"> <b> Editar </b> </a>
                    <a href="/compositores/delete/${dado.id}" style="text-decoration:none"> <b> Delete </b> </a>
                </td>
                </tr>`;
        }

        pagHTML += `
            </table>
            </ul>
            <footer class="w3-container w3-blue">
                <address> Miguel Guimarães (Web Engineering 2024) [<a href="/">Voltar</a>]</address>
            </footer>
        </div>
    </body>
    </html>
    `

    return pagHTML
}

////////////////////////////////////////////// Página do compositor //////////////////////////////////////////////
exports.paginaCompositor = function(dados){
    var pagHTML = `
    <html>
    <head>
        <title>Compositor ${dados.nome}</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
    
    <div class="w3-bar w3-black">
        <a href="/" class="w3-bar-item w3-button">Inicio</a>
        <a href="/compositores" class="w3-bar-item w3-button">Compositores</a>
        <a href="/periodos" class="w3-bar-item w3-button">Periodos</a>
        <a href="/compositores/add" class="w3-bar-item w3-button">Add Compositor</a>
        <a href="/periodos/add" class="w3-bar-item w3-button">Add Periodo</a>
    </div>

    <div class="w3-card-4">
            <header class="w3-container w3-blue">
                <i> <h1>${dados.nome}</h1> </i>
            </header>
                <br> <b>Biografia:</b> ${dados.bio} </br>
                <br> <b>Data de nascimento:</b> ${dados.dataNasc} </br>
                <br> <b>Data de obito:</b> ${dados.dataObito} </br>
                <br> <b>Periodo:</b> ${dados.periodo} </br>
            <footer class="w3-container w3-blue">
                <address> Miguel Guimarães (Web Engineering 2024) [<a href="/compositores">Voltar</a>]</address>
            </footer>
        </div>
    </body>
    </html>
    `

    return pagHTML
}

////////////////////////////////////////////// Página do compositor delete //////////////////////////////////////////////
exports.paginaCompositorDelete = function(dados){
    var pagHTML = `
    <html>
    <head>
        <title>Eliminado ${dados.nome}</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
    
    <div class="w3-bar w3-black">
        <a href="/" class="w3-bar-item w3-button">Inicio</a>
        <a href="/compositores" class="w3-bar-item w3-button">Compositores</a>
        <a href="/periodos" class="w3-bar-item w3-button">Periodos</a>
        <a href="/compositores/add" class="w3-bar-item w3-button">Add Compositor</a>
        <a href="/periodos/add" class="w3-bar-item w3-button">Add Periodo</a>
    </div>

    <div class="w3-card-4">
            <header class="w3-container w3-red">
                <h1> <b> Eliminado: </b> </h1> <h2> <i> ${dados.nome} </i> </h2>
            </header>
            <div class="w3-panel w3-pale-red w3-leftbar w3-border-red">
                <br> <b>Biografia:</b> ${dados.bio} </br>
                <br> <b>Data de nascimento:</b> ${dados.dataNasc} </br>
                <br> <b>Data de obito:</b> ${dados.dataObito} </br>
                <br> <b>Periodo:</b> ${dados.periodo} </br>
            </div>
            <footer class="w3-container w3-red">
                <address> Miguel Guimarães (Web Engineering 2024) [<a href="/compositores">Voltar</a>]</address>
            </footer>
        </div>
    </body>
    </html>
    `

    return pagHTML
}

////////////////////////////////////////////// Página compositor edit //////////////////////////////////////////////
exports.paginaCompositorEdit = function(dados){
    var pagHTML = `
    <html>
    <head>
        <title>Editar ${dados.nome}</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>

    <body class="w3-light-blue">
    <div class="w3-bar w3-black">
        <a href="/" class="w3-bar-item w3-button">Inicio</a>
        <a href="/compositores" class="w3-bar-item w3-button">Compositores</a>
        <a href="/periodos" class="w3-bar-item w3-button">Periodos</a>
        <a href="/compositores/add" class="w3-bar-item w3-button">Add Compositor</a>
        <a href="/periodos/add" class="w3-bar-item w3-button">Add Periodo</a>
    </div>

    <div class="w3-card-4">
            <header class="w3-container w3-blue">
                <i> <h1>${dados.nome}</h1> </i>
            </header>
            
            <form method="POST">
                <fieldset class="w3-light-blue">
                    <label><b> Id </b></label>
                    <input class="w3-input w3-round" type="text" name="id" readonly value="${dados.id}"/>
                    <label><b> Nome </b></label>
                    <input class="w3-input w3-round" type="text" name="nome" value="${dados.nome}"/>
                    <label><b> Biografia </b></label>
                    <input class="w3-input w3-round" type="text" name="bio" value="${dados.bio}"/>
                    <label><b> Data de nascimento </b></label>
                    <input class="w3-input w3-round" type="text" name="dataNasc" value="${dados.dataNasc}"/>
                    <label><b> Data de obito </b></label>
                    <input class="w3-input w3-round" type="text" name="dataObito" value="${dados.dataObito}"/>
                    <label><b> Periodo </b></label>
                    <input class="w3-input w3-round" type="text" name="periodo" value="${dados.periodo}"/>
                </fieldset>
                
                <button class="w3-btn w3-block w3-orange" type="submit">Editar</button>
            </form>

            <footer class="w3-container w3-blue">
                <address> Miguel Guimarães (Web Engineering 2024) [<a href="/compositores">Voltar</a>]</address>
            </footer>
        </div>
    </body>
    </html>
    `

    return pagHTML
}


////////////////////////////////////////////// Página compositor add //////////////////////////////////////////////
exports.paginaCompositorAdd = function(dados){
    var pagHTML = `
    <html>
    <head>
        <title>Adicionar compositor</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>

    <body class="w3-light-blue">
    <div class="w3-bar w3-black">
        <a href="/" class="w3-bar-item w3-button">Inicio</a>
        <a href="/compositores" class="w3-bar-item w3-button">Compositores</a>
        <a href="/periodos" class="w3-bar-item w3-button">Periodos</a>
        <a href="/compositores/add" class="w3-bar-item w3-button">Add Compositor</a>
        <a href="/periodos/add" class="w3-bar-item w3-button">Add Periodo</a>
    </div>

    <div class="w3-card-4">
            <header class="w3-container w3-blue">
                <i> <h1>Adicionar compositor</h1> </i>
            </header>
            
            <form method="POST">
                <fieldset>
                    <label>Id (CXXX)</label>
                    <input class="w3-input w3-round" type="text" name="id"/>
                    <label>Nome</label>
                    <input class="w3-input w3-round" type="text" name="nome"/>
                    <label>Bio</label>
                    <input class="w3-input w3-round" type="text" name="bio"/>
                    <label>DataNascimento</label>
                    <input class="w3-input w3-round" type="text" name="dataNasc"/>
                    <label>DataObito</label>
                    <input class="w3-input w3-round" type="text" name="dataObito"/>
                    <label>Periodo</label>
                    <input class="w3-input w3-round" type="text" name="periodo"/>
                </fieldset>

                <button class="w3-btn w3-block w3-orange" type="submit">Adicionar compositor</button>
            </form>
                

            <footer class="w3-container w3-blue">
                <address> Miguel Guimarães (Web Engineering 2024) [<a href="/compositores">Voltar</a>]</address>
            </footer>
        </div>
    </body>
    </html>
    `

    return pagHTML
}

////////////////////////////////////////////// Página do periodos //////////////////////////////////////////////
exports.paginaPeriodos = function(dados){
    var pagHTML = `
    <html>
    <head>
        <title>Periodos</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
    
    <div class="w3-bar w3-black">
        <a href="/" class="w3-bar-item w3-button">Inicio</a>
        <a href="/compositores" class="w3-bar-item w3-button">Compositores</a>
        <a href="/periodos" class="w3-bar-item w3-button">Periodos</a>
        <a href="/compositores/add" class="w3-bar-item w3-button">Add Compositor</a>
        <a href="/periodos/add" class="w3-bar-item w3-button">Add Periodo</a>
    </div>

    <div class="w3-card-4">
            <header class="w3-container w3-blue">
                <i> <h1>Periodos</h1> </i>
            </header>

            
            <table class="w3-table-all w3-light-blue">
            <tr class="w3-blue">
            <th>Periodo</th>
            <th>Ações</th>
            </tr>
            `

        for (let dado of dados) {
                pagHTML += `<tr class="w3-light-blue">
                <td><h4><a href="/periodos/${dado.id}" style="text-decoration:none">${dado.periodo}</a></h4></td>
                <td>
                    <a href="/periodos/edit/${dado.id}" style="text-decoration:none"> <b> Editar </b> </a>
                    <a href="/periodos/delete/${dado.id}" style="text-decoration:none"> <b> Delete </b> </a>
                </td>
                </tr>`;
        }

        pagHTML += `
            </table>
            <footer class="w3-container w3-blue">
                <address> Miguel Guimarães (Web Engineering 2024) [<a href="/">Voltar</a>]</address>
            </footer>
        </div>
    </body>
    </html>
    `

    return pagHTML
}

////////////////////////////////////////////// Página do periodo //////////////////////////////////////////////
exports.paginaPeriodo = function(dados,compositores){
    var pagHTML = `
    <html>
    <head>
        <title>${dados.periodo}</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
    
    <div class="w3-bar w3-black">
        <a href="/" class="w3-bar-item w3-button">Inicio</a>
        <a href="/compositores" class="w3-bar-item w3-button">Compositores</a>
        <a href="/periodos" class="w3-bar-item w3-button">Periodos</a>
        <a href="/compositores/add" class="w3-bar-item w3-button">Add Compositor</a>
        <a href="/periodos/add" class="w3-bar-item w3-button">Add Periodo</a>
    </div>

    <div class="w3-card-4">
            <header class="w3-container w3-blue">
                <i> <h1>Periodo do ${dados.periodo}</h1> </i>
                
                </header>
    
                <table class="w3-table-all w3-light-blue">
                <tr class="w3-blue">
                <th>Compositores deste periodo:</th>
                <th>Ações</th>
                </tr>
            `

    for (let comp of compositores) {
            pagHTML += `<tr class="w3-light-blue">
            <td> <a href="/compositores/${comp.id}" style="text-decoration:none"><i><h4>${comp.nome}</h4></i></a></td>
            <td>
                <a href="/compositores/edit/${comp.id}" style="text-decoration:none"> <b> Editar </b> </a>
                <a href="/compositores/delete/${comp.id}" style="text-decoration:none"> <b> Delete </b> </a>
            </td>
            </tr>`;
    }


    pagHTML += `
        </table>   
            <footer class="w3-container w3-blue">
                <address> Miguel Guimarães (Web Engineering 2024) [<a href="/periodos">Voltar</a>]</address>
            </footer>
        </div>
    </body>
    </html>
    `

    return pagHTML
}

////////////////////////////////////////////// Página dos compositores de um perido //////////////////////////////////////////////
exports.paginaPeriodoExp = function(dados, periodo){
    var pagHTML = `
    <html>
    <head>
        <title>Compositores periodo</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
    
    <div class="w3-bar w3-black">
        <a href="/" class="w3-bar-item w3-button">Inicio</a>
        <a href="/compositores" class="w3-bar-item w3-button">Compositores</a>
        <a href="/periodos" class="w3-bar-item w3-button">Periodos</a>
        <a href="/compositores/add" class="w3-bar-item w3-button">Add Compositor</a>
        <a href="/periodos/add" class="w3-bar-item w3-button">Add Periodo</a>
    </div>

    <div class="w3-card-4">
            <header class="w3-container w3-blue">
                <h1>${periodo}</h1>
            </header>
        
            <ul class="w3-ul w3-light-blue">
        `

        for (let dado of dados) {
                pagHTML += `<li> <a href="/compositores/${dado.id}" style="text-decoration:none">
                <i> <h4>${dado.nome}</h4> </i>
                </a></li>`;
        }

        pagHTML += `
            </ul>
            <footer class="w3-container w3-blue">
                <address> Miguel Guimarães (Web Engineering 2024) [<a href="/periodos">Voltar</a>]</address>
            </footer>
        </div>
    </body>
    </html>
    `

    return pagHTML
}

////////////////////////////////////////////// Página do periodo delete //////////////////////////////////////////////
exports.paginaPeriodoDelete = function(dados){
    var pagHTML = `
    <html>
    <head>
        <title>Eliminado ${dados.periodo}</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
    
    <div class="w3-bar w3-black">
        <a href="/" class="w3-bar-item w3-button">Inicio</a>
        <a href="/compositores" class="w3-bar-item w3-button">Compositores</a>
        <a href="/periodos" class="w3-bar-item w3-button">Periodos</a>
        <a href="/compositores/add" class="w3-bar-item w3-button">Add Compositor</a>
        <a href="/periodos/add" class="w3-bar-item w3-button">Add Periodo</a>
    </div>

    <div class="w3-card-4">
            <header class="w3-container w3-red">
                <h1> <b> Eliminado: </b> </h1> <h2> <i> ${dados.periodo} </i> </h2>
            </header>
            <div class="w3-panel w3-pale-red w3-leftbar w3-border-red">
                <br> <b>Periodo:</b> ${dados.periodo} </br>
            </div>
            <footer class="w3-container w3-red">
                <address> Miguel Guimarães (Web Engineering 2024) [<a href="/compositores">Voltar</a>]</address>
            </footer>
        </div>
    </body>
    </html>
    `

    return pagHTML
}

////////////////////////////////////////////// Página compositor edit //////////////////////////////////////////////
exports.paginaPeriodoEdit = function(dados){
    var pagHTML = `
    <html>
    <head>
        <title>Periodo ${dados.periodo}</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>

    <body class="w3-light-blue">
    <div class="w3-bar w3-black">
        <a href="/" class="w3-bar-item w3-button">Inicio</a>
        <a href="/compositores" class="w3-bar-item w3-button">Compositores</a>
        <a href="/periodos" class="w3-bar-item w3-button">Periodos</a>
        <a href="/compositores/add" class="w3-bar-item w3-button">Add Compositor</a>
        <a href="/periodos/add" class="w3-bar-item w3-button">Add Periodo</a>
    </div>

    <div class="w3-card-4">
            <header class="w3-container w3-blue">
                <i> <h1>${dados.periodo}</h1> </i>
            </header>
            
            <form method="POST">
                <fieldset class="w3-light-blue">
                    <label><b> Id </b></label>
                    <input class="w3-input w3-round" type="text" name="id" readonly value="${dados.id}"/>
                    <label><b> Periodo </b></label>
                    <input class="w3-input w3-round" type="text" name="periodo" value="${dados.periodo}"/>
                </fieldset>
                
                <button class="w3-btn w3-block w3-orange" type="submit">Editar</button>
            </form>

            <footer class="w3-container w3-blue">
                <address> Miguel Guimarães (Web Engineering 2024) [<a href="/periodos">Voltar</a>]</address>
            </footer>
        </div>
    </body>
    </html>
    `

    return pagHTML
}

////////////////////////////////////////////// Página compositor add //////////////////////////////////////////////
exports.paginaPeriodoAdd = function(dados){
    var pagHTML = `
    <html>
    <head>
        <title>Adicionar periodo</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>

    <body class="w3-light-blue">
    <div class="w3-bar w3-black">
        <a href="/" class="w3-bar-item w3-button">Inicio</a>
        <a href="/compositores" class="w3-bar-item w3-button">Compositores</a>
        <a href="/periodos" class="w3-bar-item w3-button">Periodos</a>
        <a href="/compositores/add" class="w3-bar-item w3-button">Add Compositor</a>
        <a href="/periodos/add" class="w3-bar-item w3-button">Add Periodo</a>
    </div>

    <div class="w3-card-4">
            <header class="w3-container w3-blue">
                <i> <h1>Adicionar periodo</h1> </i>
            </header>
            
            <form method="POST">
            <fieldset class="w3-light-blue">
                <label><b> Id </b></label>
                <input class="w3-input w3-round" type="number" name=""/>
                <label><b> Periodo </b></label>
                <input class="w3-input w3-round" type="text" name="periodo" value=""/>
            </fieldset>

                <button class="w3-btn w3-block w3-orange" type="submit">Adicionar periodo</button>
            </form>
                

            <footer class="w3-container w3-blue">
                <address> Miguel Guimarães (Web Engineering 2024) [<a href="/periodos">Voltar</a>]</address>
            </footer>
        </div>
    </body>
    </html>
    `

    return pagHTML
}
////////////////////////////////////////////// Página desconhecida //////////////////////////////////////////////
exports.unknownPage = function(){
    var pagHTML = `
    <html>
    <head>
        <title>Desconhecido</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
    
    <div class="w3-bar w3-black">
        <a href="/" class="w3-bar-item w3-button">Inicio</a>
        <a href="/compositores" class="w3-bar-item w3-button">Compositores</a>
        <a href="/periodos" class="w3-bar-item w3-button">Periodos</a>
        <a href="/compositores/add" class="w3-bar-item w3-button">Add Compositor</a>
        <a href="/periodos/add" class="w3-bar-item w3-button">Add Periodo</a>
    </div>

    <div class="w3-card-4">
            <header class="w3-container w3-red">
                <h1>Página desconhecida</h1>
            </header>

            <div class="w3-panel w3-pale-red w3-leftbar w3-border-red">
                <h2> A página não existe! </h2>
            </div>

            <footer class="w3-container w3-red">
                <address> Miguel Guimarães (Web Engineering 2024) [<a href="/">Voltar</a>]</address>
            </footer>
        </div>
    </body>
    </html>
    `

    return pagHTML
}

////////////////////////////////////////////// Página erro //////////////////////////////////////////////
exports.errorPage = function(error){
    var pagHTML = `
    <html>
    <head>
        <title>Unkown</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
    
    <div class="w3-bar w3-black">
        <a href="/" class="w3-bar-item w3-button">Inicio</a>
        <a href="/compositores" class="w3-bar-item w3-button">Compositores</a>
        <a href="/periodos" class="w3-bar-item w3-button">Periodos</a>
        <a href="/compositores/add" class="w3-bar-item w3-button">Add Compositor</a>
        <a href="/periodos/add" class="w3-bar-item w3-button">Add Periodo</a>
    </div>

    <div class="w3-card-4">
            <header class="w3-container w3-red">
                <h1>Erro na página!</h1>
            </header>

            <div class="w3-panel w3-pale-red w3-leftbar w3-border-red">
                <h2> Erro: ${error} </h2>
            </div>

            <footer class="w3-container w3-red">
                <address> Miguel Guimarães (Web Engineering 2024) [<a href="/">Voltar</a>]</address>
            </footer>
        </div>
    </body>
    </html>
    `

    return pagHTML
}