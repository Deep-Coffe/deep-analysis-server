import json
import sys
import os

from PIL import Image
from torchvision import transforms
import torch
import torch.nn as nn


try:
    # Defina o dispositivo (GPU ou CPU)
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

    class ModeloAtualizado(nn.Module):
        def __init__(self, num_classes=5):
            super(ModeloAtualizado, self).__init__()
            self.features = nn.Sequential(
                nn.Conv2d(3, 128, kernel_size=3, stride=1, padding=1),
                nn.ReLU(inplace=True),
                nn.MaxPool2d(kernel_size=2, stride=2),

                nn.Conv2d(128, 256, kernel_size=3, padding=1),
                nn.ReLU(inplace=True),
                nn.MaxPool2d(kernel_size=2, stride=2),

                nn.Conv2d(256, 512, kernel_size=3, padding=1),
                nn.ReLU(inplace=True),
                nn.MaxPool2d(kernel_size=2, stride=2),

                nn.Conv2d(512, 1024, kernel_size=3, padding=1),
                nn.ReLU(inplace=True),
                nn.MaxPool2d(kernel_size=2, stride=2),

                nn.Conv2d(1024, 2048, kernel_size=3, padding=1),
                nn.ReLU(inplace=True),
                nn.MaxPool2d(kernel_size=2, stride=2),
            )
            self.avgpool = nn.AdaptiveAvgPool2d((6, 6))
            self.classifier = nn.Sequential(
                nn.Dropout(),
                nn.Linear(2048 * 6 * 6, 512),
                nn.ReLU(inplace=True),
                nn.Dropout(),
                nn.Linear(512, num_classes),
            )

        def forward(self, x):
            x = self.features(x)
            x = self.avgpool(x)
            x = torch.flatten(x, 1)
            x = self.classifier(x)
            return x
    import gdown

    # URL de compartilhamento do Google Drive para o modelo
    url = '1JSYyFBiszZVZ3nUW8T7OZikIvDJSpg7_'

    # Caminho local onde você deseja salvar o modelo
    output = 'modelo05.pth'

    if not os.path.exists(output):
        gdown.cached_download(id='1JSYyFBiszZVZ3nUW8T7OZikIvDJSpg7_', path=output)
        print('download complete')
        print(f'data exists in {output}:\nOk:{os.path.exists(output)}')
        exit()

    # Carregue o modelo pré-treinado
    modelo_pre_treinado_path = 'modelo05.pth'
    modelo_atualizado = ModeloAtualizado()

    # Carregue o checkpoint e imprima as chaves
    checkpoint = torch.load(modelo_pre_treinado_path, map_location=device)
    # Ajuste para encontrar a chave correta
    modelo_atualizado.load_state_dict(checkpoint)
    modelo_atualizado.eval()

    # Função para pré-processar a imagem antes de passar para o modelo
    def preprocess_base64_image(fileName):
        image = Image.open(f'temp/{fileName}')
        
        transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5)),
        ])

        # Aplicar transformações e retornar a imagem
        image = transform(image).unsqueeze(0)
        return image.to(device)

    file_name = sys.argv[1]

    # Pré-processamento da imagem
    input_image = preprocess_base64_image(file_name)
    # Faça a predição
    output = modelo_atualizado(input_image)

    # Aplique a função softmax para obter probabilidades
    probabilities = torch.nn.functional.softmax(output, dim=1)
    probabilities = probabilities.cpu().detach().numpy().tolist()[0]
    # Mapeie os índices das classes para rótulos se necessário
    class_labels = ['cerscospora', 'healthy', 'leafRust', 'miner', 'phoma']
    predictions = [{"class": class_labels[i], "probability": round(probabilities[i] * 100, 2)} for i in range(len(class_labels))]

    result = {
        'miner': 0.1,
        'phoma': 0.1,
        'cerscospora': 0.1,
        'leafRust': 0.1,
        'healthy': 0.1
    }

    for i in range(len(class_labels)):
        probability = round(probabilities[i] * 100, 2)
        result[class_labels[i]] = probability

    response = json.dumps(result) 

    sys.stdout.write(str(response))
except Exception as err:
    sys.stdout.write(str(err.message))