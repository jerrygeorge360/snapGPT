from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from pathlib import Path


class PDF:

    def __init__(self, name):
        self.path = Path(f'./static/ThePDF/{name}')

        my_width, my_height = A4
        self.name = name
        self.c = canvas.Canvas(f"{self.path}.pdf", pagesize=A4)
        self.t = self.c.beginText()
        self.t.setFont('Helvetica-Bold', 10)
        self.t.setCharSpace(3)
        self.t.setTextOrigin(50, 700)

    def read_from_file(self, file_name):
        with open(file_name, 'r', encoding="utf-8") as f:
            readme = f.read()
            self.t.textLines(readme)
        # t.textLine("I am the GOAT")
        self.c.drawText(self.t)
        # c.drawText(texta)
        # c.showPage()

        self.c.save()

    def read_directly(self, data):
        with open(f"{self.path}.txt", 'w') as f:
            f.write(data)
        self.t.textLine(data)
        self.c.drawText(self.t)
        self.c.save()



