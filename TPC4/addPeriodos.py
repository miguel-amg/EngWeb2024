""" 
    Name: Miguel Guimarães
    University: Universidade do Minho
    Engenharia Web 2024 / Web Engineering 2024

    Note #1: This file is resposible for reading the JSON file and inserting a 'periodos' object.
"""

# Import json
import json

# Open the json
file = open("compositores.json","r")
data = json.load(file)

# Create the object periodos in the json
data['periodos'] = []
periodos = set()

# Add all 'periodos' to the set
for dataLine in data['compositores']:
    if dataLine['periodo'] not in periodos:
        periodos.add(dataLine['periodo'])
        print("Periodo reconhecido:" + dataLine['periodo'])

# Add the 'periodos' from the set into the json
elem_id = 0
for elem in periodos:
    # Get 'compositores' from this 'periodo'
    # Add the periodo
    data['periodos'].append({"id": elem_id, "periodo": elem})
    elem_id += 1

# Dump the data into the json
file.close()
file = open("compositores.json","w")
json.dump(data, file, indent=2, ensure_ascii=False)

print("Completo!")