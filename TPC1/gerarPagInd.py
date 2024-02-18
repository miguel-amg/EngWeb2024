# Miguel Guimarães
# Engenharia Web 2024

# Imports
import os
import xml.etree.ElementTree as ET
import re

# Variaveis de configuração
path_img_atuais = "bd/atual/"
path_img_antigas = "bd/imagem/"
path_texto = "bd/texto/"
path_paginas = "pags"

#############################################################
# Obter todos os nomes dos ficheiros XML da pag texto
nomes_ficheiros = os.listdir(path_texto)

# Iterar cada ficheiro XML na pasta (/texto/)
for nome_ficheiro in nomes_ficheiros:
    # Caminho para rua.xml (/texto/)
    path_ficheiro = path_texto + nome_ficheiro

    # Extrair as tags e os seus valores
    tree = ET.parse(path_ficheiro) 

    ##############################################################################
    #                                  CONTEUDO                                  #                            
    ##############################################################################
    # Criar barra inicial na página
    root = tree.getroot() # Obter a tag principal
    conteudo = ""

    ############################ Encontrar todas as figuras e adiciona-las á página ############################    
    for figura in root.findall(".//corpo/figura"):
        figura_id = figura.get('id')  # Obter o atributo 'id' da tag <figura>
        
        # Obter informações dentro da tag <imagem> e <legenda>
        imagem_path_raw = figura.find("imagem").get('path')
        imagem_path = imagem_path_raw[10:] # Remover os dez primeiros caracteres do caminho da imagem
        imagem_antiga_path =  "../" + path_img_antigas + imagem_path
        
        # Adicionar a imagem antiga
        conteudo += f"""<div><img src="{imagem_antiga_path}" alt="{figura_id}" style="width: 40%" class="w3-border w3-padding"> </div> """
        
        # Adicionar a legenda da imagem ao html
        legenda_texto = figura.find("legenda").text
        conteudo += f"""{legenda_texto}"""

    conteudo += "<h2> Informações sobre a rua: </h2>"

    ############################ Iterar todos os parágrafos ############################
    for para in root.findall(".//corpo/para"):
        # Obter todo o texto dentro da tag <para> incluindo as outras tags
        paragrafo_com_tags = ET.tostring(para, encoding="unicode", method="xml")
        
        # Aplicar as substituições necessárias
        paragrafo_com_tags = paragrafo_com_tags.replace("<data>", "<b>")
        paragrafo_com_tags = paragrafo_com_tags.replace("</data>", "</b>")

        paragrafo_com_tags = paragrafo_com_tags.replace("""<entidade tipo="pessoa">""", "<b>")
        paragrafo_com_tags = paragrafo_com_tags.replace("</entidade>", "</b>")

        paragrafo_com_tags = paragrafo_com_tags.replace("<lugar>", "<i> \"")
        paragrafo_com_tags = paragrafo_com_tags.replace("</lugar>", "\"</i>")

        # Iniciar o parágrafo em HTML
        conteudo += "<p> " + paragrafo_com_tags + " </p>"

    ############################ Iterar todos os parágrafos ############################
    for lista_casas in root.findall(".//lista-casas"):
        # Obter todo o texto dentro da tag <lista-casas> incluindo as outras tags
        conteudo_lcasas = ET.tostring(lista_casas, encoding="unicode", method="xml")
            
        # Aplicar as substituições necessárias
        conteudo_lcasas = conteudo_lcasas.replace("<casa>", "<tr> <td>")
        conteudo_lcasas = conteudo_lcasas.replace("</casa>", "</tr> <td>")

        conteudo_lcasas = conteudo_lcasas.replace("<número>", "<b>")
        conteudo_lcasas = conteudo_lcasas.replace("</número>", " </b> - ")

        conteudo_lcasas = conteudo_lcasas.replace("<desc>", "")
        conteudo_lcasas = conteudo_lcasas.replace("</desc>", "")

        conteudo_lcasas = conteudo_lcasas.replace("<para>", "")
        conteudo_lcasas = conteudo_lcasas.replace("</para>", "")

        conteudo_lcasas = conteudo_lcasas.replace("<lugar>", "<i> \"")
        conteudo_lcasas = conteudo_lcasas.replace("</lugar>", "\"</i>")

        conteudo_lcasas = conteudo_lcasas.replace("<data>", "<b>")
        conteudo_lcasas = conteudo_lcasas.replace("</data>", "</b>")

        conteudo_lcasas = conteudo_lcasas.replace("<enfiteuta>", "<b> Enfiteuta: </b>")
        conteudo_lcasas = conteudo_lcasas.replace("</enfiteuta>", "")
        
        conteudo_lcasas = conteudo_lcasas.replace("<foro>", "<b> Foro: </b>")
        conteudo_lcasas = conteudo_lcasas.replace("</foro>", "")
        # Iniciar a lista em HTML
        conteudo += """
        <h1> Casas </h1>
            <table class="w3-table w3-striped">
            <tr>
                <th>Descrição</th>
            </tr>
        
        """ + conteudo_lcasas + " </table>"
    
    ##############################################################################
    #                                   FIM                                      #                            
    ##############################################################################
            
    ## Obter tags especificas para pre/pos html e para geração de páginas 
    num_elemento = root.find(".//número") # Obter a tag <número> </número>
    nome_pagina = root.find(".//nome")    # Obter a tag <nome> </nome>

    preHTML = f"""
        <!DOCTYPE html>
        <html>
            <head>
                <title> {nome_pagina.text} </title>
                <link rel="stylesheet" href="w3.css">
                <meta charset="UTF-8">
            </head>

            <body>
                <div class="w3-container w3-teal">
                    <h1><b>{nome_pagina.text}</b> (Página {num_elemento.text})</h1>
                </div>
    """
            
    fimHTML = """
        </body>
    </html>    
    """
        
        
    HTMLfinal = preHTML + conteudo + fimHTML
        
    # Criar página individual apartir do numero extraido
    f = open(f"""{path_paginas}/{num_elemento.text}.html""", 'wb')
    f.write(HTMLfinal.encode('utf-8'))
    f.close

