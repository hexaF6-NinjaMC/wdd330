from logging import root
import tkinter as tk
from tkinter import filedialog
import mammoth
import os

#initiate tinker and hide window:
root = tk.Tk()
root.withdraw()

root.overrideredirect(True)
root.geometry('0x0+0+0')

root.deiconify()
root.lift()
root.focus_force()

# Open file selectors:
path = filedialog.askopenfilenames(parent = root, initialdir = "/", title = 'Please select file(s) for conversion to HTML:', multiple = True)
templateFileSelection = filedialog.askopenfilename(parent = root, initialdir = "/", title = 'Please select template file:', defaultextension = ".txt")
# Close file selectors:
root.destroy()

fileSelection = list(path)

# Convert word (DOCX) to HTML using Mammoth:
for file in fileSelection:
    with open(file, "rb") as docx_file:
        result = mammoth.convert_to_html(docx_file)
        text = result.value #The raw text
        messages = result.messages #Any messages
        name, ext = os.path.splitext(file)
        weekNum = str(name).split("_", maxsplit = 1)[0][-2:]

        with open(templateFileSelection, "r") as templateFile:
            templateData = templateFile.read().split(sep = "<#splitter>")
        
        with open(f'{name}.html', 'w') as text_file:
            text_file.write(f'{templateData[0]}{weekNum}{templateData[1]}\n{text}\n{templateData[2]}{weekNum}{templateData[3]}')
