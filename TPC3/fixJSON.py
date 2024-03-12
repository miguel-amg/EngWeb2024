""" 
    Name: Miguel Guimarães
    University: Universidade do Minho
    Engenharia Web 2024 / Web Engeneering 2024

    Note: This file is resposible for fixing the raw JSON given by the teacher of the course.
"""

################## Setup ##################
file_name = input("Insert the name of the json (ex: \'filmes\'): ")

og_file = file_name + ".json"
new_file = file_name + "-clean.json"
print("New file created: " + new_file)

f_og = open(og_file,"r") # Read original file
f_new = open(new_file,"w") # Save in new file

################## Reading ##################
lines = f_og.readlines()

# Add missing info at start
f_new.write("{\"filmes\":[\n")

# Add "," to the end of each line 
for i, line in enumerate(lines):
    new_line = line.strip()

    # Check if its not the last element
    if i < len(lines) - 1: 
        new_line += ","
    new_line += "\n"

    f_new.write(new_line)

# Add the missing info at the end
f_new.write("]}")