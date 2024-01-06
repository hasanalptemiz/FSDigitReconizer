

class RecognitionService:
    def __init__(self,model_path):
        self.recognition = Recognition()

    def recognize(self, image):
        return self.recognition.recognize(image)