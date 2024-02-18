# Miguel Guimarães
# Engenharia Web 2024

# Imports
import os
import xml.etree.ElementTree as ET

# Variaveis de configuração
path_ficheiros = "bd/texto/"

# Obter todos os nomes dos ficheiros XML
nomes_ficheiros = os.listdir(path_ficheiros)

########################################################################################
preHtml = f"""
<!DOCTYPE html>
<html>
    <head>
        <title> Mapa das Ruas de Braga </title>
        <link rel="stylesheet" href="w3.css">
        <meta charset="UTF-8">
    </head>

    <body>
        <div class="w3-container w3-teal">
            <h1> Ruas de Braga </h1>
        </div>
"""
########################################################################################
conteudoHTML = ""

# Iterar todos os ficheiros XML
for nome_ficheiro in nomes_ficheiros:
    path_ficheiro = path_ficheiros + nome_ficheiro
 
    tree = ET.parse(path_ficheiro) 
    root = tree.getroot()                 # Obter a tag principal
    nome_elemento = root.find(".//nome")  # Obter a tag <nome> </nome>
    num_elemento = root.find(".//número") # Obter a tag <número> </número>

    # Objetivo
    nome_local = nome_elemento.text 
    numero = num_elemento.text

    conteudoHTML += f"""
        <br> 
        <button class="w3-button w3-white w3-border w3-border-blue" onclick="location.href='pags/{numero}.html';">{nome_local}</button> 
        <br>
    """
########################################################################################
posHTML = f"""
    </body>
</html>
"""
########################################################################################
HTMLfinal = preHtml + conteudoHTML + posHTML

# Escrever o codigo html final
f = open('index.html', 'wb')
f.write(HTMLfinal.encode('utf-8'))
f.close

