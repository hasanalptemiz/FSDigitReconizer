# Dockerfile

# Resmi Python imajını kullanın
FROM python:3.10.2-slim

# Çalışma dizinini belirtin
WORKDIR /app

# Gerekli Python bağımlılıklarını kopyalayın
COPY requirements.txt .

# Bağımlılıkları yükleyin
RUN pip install --no-cache-dir -r requirements.txt

# Geri kalan proje dosyalarını kopyalayın
COPY . .

# Uygulamayı çalıştırın
CMD ["python3", "main.py"]