class Base64ToImage:
    def __init__(self, name_of_image, data):
        import base64
        self.name_of_image = name_of_image
        self.data = data.decode().split(',')[1]

        with open(name_of_image, "wb") as f:
            image_data = base64.b64decode(self.data)
            f.write(image_data)
