from fileinput import filename
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

# Open file selector:
path = filedialog.askopenfilenames(parent = root, initialdir = "/", title = 'Please select file(s)', multiple = True)
# Close file selector:
root.destroy()

fileSelection = list(path)

# Convert word (DOCX) to HTML using Mammoth:
for file in fileSelection:
    with open(file, "rb") as docx_file:
        result = mammoth.extract_raw_text(docx_file)
        text = result.value #The raw text
        messages = result.messages #Any messages
        name, ext = os.path.splitext(file)
        
        with open(f'{name}.html', 'w') as text_file:
            text_file.write(text)
