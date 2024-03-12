exports.paginaFilmes = function(dados){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png">
            <link rel="stylesheet" href="w3.css"/>
            <title>Filmes Americanos</title>
        </head>
        <body> 
        
        <div class="w3-bar w3-black">
            <a href="/" class="w3-bar-item w3-button">Inicio</a>
            <a href="/filmes" class="w3-bar-item w3-button">Filmes</a>
            <a href="/atores" class="w3-bar-item w3-button">Atores</a>
            <a href="/generos" class="w3-bar-item w3-button">Generos</a>
        </div>

        <header class="w3-container w3-blue">
            <h1>Filmes Americanos</h1>
        </header>

        <ul class="w3-ul w3-small w3-light-blue">
        `
        // Iterar os dados
        for(let i=0; i < dados.length ; i++){
            pagHTML += `<li> <a href="/filmes/${dados[i].id}" style="text-decoration:none"> <b><h3> ${dados[i].title} </h3></b> <b>Ano:</b> ${dados[i].year} <b>Cast:</b>` 
            
            // Iterar o cast
            if (dados[i].cast.length == 0) {
                pagHTML += " Sem cast";
            } else {
                // Tem elementos no cast
                for (let w = 0; w < dados[i].cast.length; w++) {
                    pagHTML += `${dados[i].cast[w]}`;
                    
                    // Adicionar vírgula se não for o último elemento
                    if (w < dados[i].cast.length - 1) {
                        pagHTML += ', ';
                    }
                }
            }

            pagHTML += " <b>Generos:</b> "
            
            // Iterar os gêneros
            if (dados[i].genres.length == 0) {
                pagHTML += " Sem gêneros";
            } else {
                // Tem elementos nos gêneros
                for (let w = 0; w < dados[i].genres.length; w++) {
                    pagHTML += `${dados[i].genres[w]}`;

                    // Adicionar vírgula se não for o último elemento
                    if (w < dados[i].genres.length - 1) {
                        pagHTML += ', ';
                    }
                }
            }

            pagHTML += ` </a> </li>`
        }

    pagHTML += `
            </ul>
            <footer class="w3-container w3-blue">
                <address> Realizado por Miguel Guimarães - [<a href="/">Voltar</a>]</address>
            </footer>
        </body>
    </html>
    `
    return pagHTML
}

// -------------- Error Treatment ------------------------------
exports.filmeId = function(dados){
    console.log(dados)
    var pagHTML = `
    <html>
    <head>
        <title>${dados.title}</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
    
    <div class="w3-bar w3-black">
        <a href="/" class="w3-bar-item w3-button">Inicio</a>
        <a href="/filmes" class="w3-bar-item w3-button">Filmes</a>
        <a href="/atores" class="w3-bar-item w3-button">Atores</a>
        <a href="/generos" class="w3-bar-item w3-button">Generos</a>
    </div>

    <div class="w3-card-4">
            <header class="w3-container w3-blue">
                <h1>${dados.title}:</h1>
            </header>
            <b> Ano: </b> ${dados.year} 
    `
        pagHTML += " <b>Cast:</b> "
        
        // Iterar o cast
        if (dados.cast.length == 0) {
            pagHTML += "Sem cast";
        } else {
            // Tem elementos no cast
            for (let w = 0; w < dados.cast.length; w++) {
                pagHTML += `${dados.cast[w]}`;
                
                // Adicionar vírgula se não for o último elemento
                if (w < dados.cast.length - 1) {
                    pagHTML += ', ';
                }
            }
        }
        pagHTML += " <b>Generos:</b> "
        
        // Iterar os gêneros
        if (dados.genres.length == 0) {
            pagHTML += "Sem gêneros";
        } else {
            // Tem elementos nos gêneros
            for (let w = 0; w < dados.genres.length; w++) {
                pagHTML += `${dados.genres[w]}`;
                // Adicionar vírgula se não for o último elemento
                if (w < dados.genres.length - 1) {
                    pagHTML += ', ';
                }
            }
        }

        pagHTML += `
            <footer class="w3-container w3-blue">
                <address> Realizado por Miguel Guimarães - [<a href="/filmes">Voltar</a>]</address>
            </footer>
        </div>
    </body>
    </html>
    `

    return pagHTML
}

// -------------- Página atores ------------------------------
exports.paginaAtores = function(dados){
    var pagHTML = `
    <html>
    <head>
        <title>Atores</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>

    <div class="w3-bar w3-black">
        <a href="/" class="w3-bar-item w3-button">Inicio</a>
        <a href="/filmes" class="w3-bar-item w3-button">Filmes</a>
        <a href="/atores" class="w3-bar-item w3-button">Atores</a>
        <a href="/generos" class="w3-bar-item w3-button">Generos</a>
    </div>

    <div class="w3-card-4">
            <header class="w3-container w3-blue">
                <h1>Atores</h1>
            </header>
            <ul class="w3-ul w3-light-blue">
    `

        for (let ator of dados) {
            pagHTML += `<li> <a href="/atores/${ator.id}" style="text-decoration:none">${ator.actor}<br></a> </li>`;
        }

        pagHTML += `
            </ul>
            <footer class="w3-container w3-blue">
                <address> Realizado por Miguel Guimarães - [<a href="/">Voltar</a>]</address>
            </footer>
        </div>
    </body>
    </html>
    `

    return pagHTML
}

// -------------- Página generos ------------------------------
exports.paginaGeneros = function(dados){
    var pagHTML = `
    <html>
    <head>
        <title>Generos</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
    
    <div class="w3-bar w3-black">
        <a href="/" class="w3-bar-item w3-button">Inicio</a>
        <a href="/filmes" class="w3-bar-item w3-button">Filmes</a>
        <a href="/atores" class="w3-bar-item w3-button">Atores</a>
        <a href="/generos" class="w3-bar-item w3-button">Generos</a>
    </div>

    <div class="w3-card-4">
            <header class="w3-container w3-blue">
                <h1>Generos</h1>
            </header>
        
            <ul class="w3-ul w3-light-blue">
        `

        for (let genero of dados) {
            pagHTML += `<li> <a href="/generos/${genero.id}" style="text-decoration:none"> ${genero.genre}<br></a></li>`;
        }

        pagHTML += `
            </ul>
            <footer class="w3-container w3-blue">
                <address> Realizado por Miguel Guimarães - [<a href="/">Voltar</a>]</address>
            </footer>
        </div>
    </body>
    </html>
    `

    return pagHTML
}

// -------------- Página ator individual ------------------------------
exports.paginaAtorInd = function(dados){
    var pagHTML = `
    <html>
    <head>
        <title>Filmes do ator: ${dados.actor} </title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
    
    <div class="w3-bar w3-black">
        <a href="/" class="w3-bar-item w3-button">Inicio</a>
        <a href="/filmes" class="w3-bar-item w3-button">Filmes</a>
        <a href="/atores" class="w3-bar-item w3-button">Atores</a>
        <a href="/generos" class="w3-bar-item w3-button">Generos</a>
    </div>

    <div class="w3-card-4">
            <header class="w3-container w3-blue">
                <h1>Filmes do ator/atora ${dados.actor}:</h1>
                `
        counter = 0;
        for(let dado of dados.movies){
            pagHTML += `<a href="/filmes/${dado}"> <br> Filme #${counter} </br> </a>` 
            counter++;
        } 
            
    pagHTML += `    </header>
            <footer class="w3-container w3-blue">
                <address> Realizado por Miguel Guimarães - [<a href="/atores">Voltar</a>]</address>
            </footer>
        </div>
    </body>
    </html>
    `

    return pagHTML
}

// -------------- Página genero individual ------------------------------
exports.paginaGeneroInd = function(dados){
    var pagHTML = `
    <html>
    <head>
        <title>Filmes do genero: ${dados.genre} </title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
    
    <div class="w3-bar w3-black">
        <a href="/" class="w3-bar-item w3-button">Inicio</a>
        <a href="/filmes" class="w3-bar-item w3-button">Filmes</a>
        <a href="/atores" class="w3-bar-item w3-button">Atores</a>
        <a href="/generos" class="w3-bar-item w3-button">Generos</a>
    </div>

    <div class="w3-card-4">
            <header class="w3-container w3-blue">
                <h1>Filmes do genero ${dados.genre}:</h1>
                `
        counter = 0;
        for(let dado of dados.movies){
            pagHTML += `<a href="/filmes/${dado}"> <br> Filme #${counter} </br> </a>` 
            counter++;
        } 
            
    pagHTML += `    </header>
            <footer class="w3-container w3-blue">
                <address> Realizado por Miguel Guimarães - [<a href="/generos">Voltar</a>]</address>
            </footer>
        </div>
    </body>
    </html>
    `

    return pagHTML
}

// -------------- Error Treatment ------------------------------
exports.errorPage = function(errorMessage, d){
    return `
    <html>
    <head>
        <title>Error page</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body class="w3-blue">
    <div class="w3-card-4">
            <header class="w3-container w3-teal">
                <h1>Error page</h1>
            </header>

            <div class="w3-container">
                <p>${d}: Error: ${errorMessage}</p>
            </div>

            <footer class="w3-container w3-teal">
                <address>Gerado por galuno::ENGWEB2024 em ${d} - [<a href="/alunos">Voltar</a>]</address>
            </footer>
        </div>
    </body>
    </html>

    
    `
}

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
        <a href="/filmes" class="w3-bar-item w3-button">Filmes</a>
        <a href="/atores" class="w3-bar-item w3-button">Atores</a>
        <a href="/generos" class="w3-bar-item w3-button">Generos</a>
    </div>

    <div class="w3-card-4">
            <header class="w3-container w3-red">
                <h1>Página desconhecida</h1>
            </header>

            <div class="w3-panel w3-pale-red w3-leftbar w3-border-red">
                <h2> A página não existe! </h2>
            </div>

            <footer class="w3-container w3-red">
                <address> Realizado por Miguel Guimarães - [<a href="/">Voltar</a>]</address>
            </footer>
        </div>
    </body>
    </html>
    `

    return pagHTML
}


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

        <a href="/filmes" style="text-decoration:none"> <button class="w3-button w3-block w3-light-blue"><h2>Filmes</h2></button> </a>
        <a href="/atores" style="text-decoration:none"> <button class="w3-button w3-block w3-light-blue"><h2>Atores</h2></button> </a>
        <a href="/generos" style="text-decoration:none"> <button class="w3-button w3-block w3-light-blue"><h2>Generos</h2></button> </a>

        <footer class="w3-container w3-blue">
        <address> Realizado por Miguel Guimarães, Engenharia Wev 2024 </address>
        </footer>
    </body>
    </html>
    `

    return pagHTML
}