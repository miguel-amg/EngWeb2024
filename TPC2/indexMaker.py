""" 
    Name: Miguel Guimarães
    University: Universidade do Minho
    Engenharia Web 2024 / Web Engeneering 2024

    Nota: 
    - Todo o código está escrito em inglês por escolha.
    - O ficheiro JSON deve ser fornecido através de um pipe (usar cat mapa-virtual.json | python3 indexMaker.py). 
"""

# Imports
import json
import sys

# Setup variables
mapString = sys.stdin.read() # Read file path from stdin (cat mapa-virtual.json | python3 pageMaker.py)
pageFolder = ""

############################### Code ###############################
# Open json
mapInfo = json.loads(mapString)

############################### City Content ###############################
# Order cities by name
ordered_Cities = sorted(mapInfo['cidades'], key=lambda x: x['nome'])

contentHTML = ""

# Iterate every city
for data in ordered_Cities:
    contentHTML += f"""
        <br> <a href="{data["id"]}"> Cidade {data["nome"]} </h1> </a> </br>  
    """

    ############################### HTML ###############################
    preHTML = f"""
    <!DOCTYPE html>
        <html>
            <head>
                <title> Página principal </title>
                <link rel="stylesheet" href="w3.css">
                <meta charset="UTF-8">
            </head>
        <body>
        <h1> Cidades: </h1>
    """

    postHTML = "</body></html>"
    
############################### SAVING ###############################
# Save the page
folder = pageFolder + "index.html"
page = open(folder, mode="w", encoding='utf-8')

finalContent = preHTML + contentHTML + postHTML

page.write(finalContent)
page.close()

# Ending
print("Finished!")