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
    </div>

    <div class="w3-card-4">
            <header class="w3-container w3-blue">
                <h1>Compositores</h1>
            </header>
        
            <ul class="w3-ul w3-light-blue">
        `

        for (let dado of dados) {
                pagHTML += `<li> <a href="/compositores/${dado.id}" style="text-decoration:none">
                <i> <h2>${dado.nome}</h2> </i>
                <br> <b>Biografia:</b> ${dado.bio} </br>
                <br> <b>Data de nascimento:</b> ${dado.dataNasc} </br>
                <br> <b>Data de obito:</b> ${dado.dataObito} </br>
                <br> <b>Periodo:</b> ${dado.periodo} </br>
                </a></li>`;
        }

        pagHTML += `
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
                <address> Miguel Guimarães (Web Engineering 2024) [<a href="/">Voltar</a>]</address>
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
    </div>

    <div class="w3-card-4">
            <header class="w3-container w3-red">
                <h1>Página desconhecida</h1>
            </header>

            <div class="w3-panel w3-pale-red w3-leftbar w3-border-red">
                <h2> A página não existe! </h2>
            </div>

            <footer class="w3-container w3-blue">
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