from PIL import Image
import pytesseract as ocr


def convert_image_to_text(path):
    try:

        with Image.open(path) as im:
            text = ocr.image_to_string(im)

            with open("d.txt","w") as f:
                f.write(text)
            return text
    except Exception as err:
        return

