# Miguel Guimarães
# Engenharia Web 2024

# Imports
import os
import xml.etree.ElementTree as ET

# Variaveis de configuração
path_img_atuais = "bd/atual/"
path_img_antigas = "bd/imagem/"
path_texto = "bd/texto/"

# Obter todos os nomes dos ficheiros XML da pag texto
nomes_ficheiros = os.listdir(path_texto)

# Iterar todos os ficheiros XML
for nome_ficheiro in nomes_ficheiros:
    path_ficheiro = path_texto + nome_ficheiro
 
    tree = ET.parse(path_ficheiro) 
    root = tree.getroot()               # Obter a tag principal
    nome_elemento = root.find(".//nome") # Obter a tag <nome> </nome>
    nome_elemento = root.find(".//nome") # Obter a tag <nome> </nome>

    # Guardar valor da tag
    nome_local = nome_elemento.text 

    conteudoHTML += f"""
        <br> {nome_local} </br> 
    """
