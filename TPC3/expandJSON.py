""" 
    Name: Miguel Guimarães
    University: Universidade do Minho
    Engenharia Web 2024 / Web Engeneering 2024

    Note #1: This file is resposible for reading the clean JSON file and creating a new JSON file with seprate objects.
    Note #2: The code in this file is laggy because it registers for each actor and genre the movies that they are in.
"""

# Imports
import json 
import sys

# Get JSON path
path = sys.argv[1]

if(len(sys.argv) == 2):
    # Create final JSON file
    finalFile = path[:-5] + "-expanded.json"
    finalContent = {"filmes":[], "atores":[], "generos":[]}
    
    # Open files
    file = open(path, "r")
    finalFile = open(finalFile, "w")

    data = json.load(file)

    # Counters 
    genres = set()
    actors = set()

    # New clean content
    for dataLine in data["filmes"]:
        filmesLine = {
            "id": dataLine["_id"]["$oid"],
            "title": dataLine.get("title", ""),
            "year": dataLine.get("year", ""),
            "cast": dataLine.get("cast", []),
            "genres": dataLine.get("genres", [])
        }

        # Add filmes
        finalContent["filmes"].append(filmesLine)

        # Add actors
        for actor in dataLine.get("cast", []):
            if actor not in actors:
                actors.add(actor)
                finalContent["atores"].append({
                    "id": len(actors),
                    "actor": actor,
                    "movies": [filmesLine["id"]]
                })
            else:
                for a in finalContent["atores"]:
                    if a["actor"] == actor:
                        a["movies"].append(filmesLine["id"])

        # Add genres
        for genre in dataLine.get("genres", []):
            if genre not in genres:
                genres.add(genre)
                finalContent["generos"].append({
                    "id": len(genres),
                    "genre": genre,
                    "movies": [filmesLine["id"]]
                })
            else:
                for g in finalContent["generos"]:
                    if g["genre"] == genre:
                        g["movies"].append(filmesLine["id"])

    # Add the content to the new file
    json.dump(finalContent, finalFile, indent=2)
