""" 
    Name: Miguel Guimarães
    University: Universidade do Minho
    Engenharia Web 2024 / Web Engeneering 2024 

    Nota: 
    - No intuito de otimizar o conteúdo das ligações, o JSON é percorrido apenas uma vez como um desafio de otimização.
    - Todo o código está escrito em inglês por escolha.
    - O ficheiro JSON deve ser fornecido através de um pipe (usar cat mapa-virtual.json | python3 pageMaker.py).
"""

# Imports
import json
import sys

# Setup variables
mapString = sys.stdin.read() # Read file path from stdin (cat mapa-virtual.json | python3 pageMaker.py)
pagesFolder = "pags"

############################### Aux functions ###############################
# Returns the name of a city using its id
def find_city_name (mapInfo, target_id):
    for data in mapInfo['cidades']:
        if data["id"] == target_id:
            return data["nome"]

############################### Code ###############################
# Open json
mapInfo = json.loads(mapString)

############################### City connection Content ###############################
cityConns = {} 

# Iterate every connection
for connection in mapInfo['ligacoes']:
    conn_id = connection.get("id")
    conn_origin = connection.get("origem")
    conn_distance = connection.get("distância")
    conn_destination = connection.get("destino")

    destination_name = find_city_name(mapInfo, conn_origin)

    # Save info of this connection in a dictionary
    info = {}
    info["id"] = conn_id
    info["origem"] = conn_origin
    info["distância"] = conn_distance
    info["destino"] = conn_destination
    info["nome_destino"] = destination_name

    # Add the info of this connection  
    if conn_origin in cityConns:
        cityConns[conn_origin].append(info)  # Add to array if it exists
    else:
        cityConns[conn_origin] = [info]  # Create array if it doesn't exist

############################### City Content ###############################
# Iterate every city
for data in mapInfo['cidades']:
    contentHTML = f"""
        <h1> Cidade "{data["nome"]}" </h1>
        <br> <b> Id: </b> {data["id"]} </br>
        <br> <b> Distrito: </b> {data["distrito"]} </br>
        <br> <b> População: </b> {data["população"]} </br>
        <br> <b> Descrição: </b> {data["descrição"]} </br>
        <b> Ligações: </b>  
    """

    # Add all connections of this city
    for conn in cityConns.get(data["id"], []):
        c_id = conn.get("id")
        c_origem = conn.get("origem")
        c_distance = conn.get("distância")
        c_destination= conn.get("destino")
        c_city_name = find_city_name(mapInfo, c_destination)

        contentHTML += f"""
            <br> <b> {data["nome"]} - <a href="/{c_destination}"> {c_city_name}</a>: </b> Distância é de {c_distance} metros.</br>            
        """
    ############################### HTML ###############################
    preHTML = f"""
    <!DOCTYPE html>
        <html>
            <head>
                <title> {data["nome"]} </title>
                <link rel="stylesheet" href="w3.css">
                <meta charset="UTF-8">
            </head>
        <body>
    """

    postHTML = "</body></html>"
    
    ############################### SAVING ###############################
    # Save the page
    pageFolder = pagesFolder + "/" + data["id"] + ".html"
    page = open(pageFolder, mode="w", encoding='utf-8')

    finalContent = preHTML + contentHTML + postHTML

    page.write(finalContent)
    page.close()

# Ending
print("Finished!")