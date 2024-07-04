import asyncio
import base64
from io import BytesIO
from PIL import Image
from torchvision import transforms
import torch
import torch.nn as nn

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

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Carregue o modelo pré-treinado
modelo_pre_treinado_path = 'modelo05.pth'
modelo_atualizado = ModeloAtualizado()

# Carregue o checkpoint e imprima as chaves
checkpoint = torch.load(modelo_pre_treinado_path, map_location=device)
# Ajuste para encontrar a chave correta
modelo_atualizado.load_state_dict(checkpoint)
modelo_atualizado.eval()

# Função para pré-processar a imagem antes de passar para o modelo
def preprocess_base64_image(file: str):
    image = Image.open(BytesIO(base64.b64decode(file)))
    
    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5)),
    ])

    # Aplicar transformações e retornar a imagem
    image = transform(image).unsqueeze(0)
    return image.to(device)

async def classify_image(file: str) -> dict[str, float]:
    loop = asyncio.get_event_loop()
    input_image = await loop.run_in_executor(None, preprocess_base64_image, file)
    output = await loop.run_in_executor(None, modelo_atualizado, input_image)

    # Aplique a função softmax para obter probabilidades
    probabilities = torch.nn.functional.softmax(output, dim=1)
    probabilities = probabilities.cpu().detach().numpy().tolist()[0]
    # Mapeie os índices das classes para rótulos se necessário
    class_labels = ['cerscospora', 'healthy', 'leafRust', 'miner', 'phoma']
    result = {label: 0 for label in class_labels}

    for i in range(len(class_labels)):
        probability = round(probabilities[i] * 100, 2)
        result[class_labels[i]] = probability
    
    return result